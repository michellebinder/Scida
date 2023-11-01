import formidable from "formidable";
import fs from "fs";
const mysql = require("mysql2");
const fastcsv = require("fast-csv");
//Import nextauth to secure the api
import { getSession } from "next-auth/react";
import { remove_duplicates } from "../../gloabl_functions/array";

//Code snippets taken from https://codesandbox.io/s/thyb0?file=/pages/api/file.js and adapted for this usecase and node/fs/formidable version

// Value for the checkBox which has been entered by the user
let checkboxValues = "";
let lecturer = "";
let lecturerMail = "";
const COLUMN_OF_BLOCK = 6;

export default async (req, res) => {
  const session = await getSession({ req });

  //Check if a session exists
  if (session) {
    //Try to recieve correct user role
    var role;
    try {
      //Try ldap, if not existent do catch with local accounts
      role = session.user.attributes.UniColognePersonStatus;
    } catch {
      role = session.user.account_role;
    }
    // Save the checkbox valu, lecturer (+email) which has been entered in the frontend
    checkboxValues = req.headers.checkbox;
    lecturer = req.headers.lecturer;
    lecturerMail = req.headers.mail;
    console.log(checkboxValues);
    console.log(lecturer);
    console.log(lecturerMail);

    //Check if users role is allowed to contact api, here role A (Admin i.e. Dekanat) is allowed
    if (role === "scidaDekanat") {
      req.method === "POST"
        ? post(req, res) //Call post method
        : req.method === "PUT"
        ? console.log("PUT")
        : req.method === "DELETE"
        ? console.log("DELETE")
        : req.method === "GET"
        ? console.log("GET")
        : res.status(404).send("");
    }
    //Return unAUTHORIZED if wrong role
    else {
      res.status(401).json({ error: "Unauthorized user -> Wrong role" });
    }
  }
  //Return unAUTHENTICATED if not logged in
  else {
    res.status(401).json({ error: "Unauthenticated user -> Not logged in" });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

//Process post request
//Process post request
const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function(err, fields, files) {
    console.log("Hier gehts");
    saveFile(files.file, res); //Call saveFile method to save the file
  });
};

const getSemesterFromDate = (date) => {
  let semester = "";
  let year = Number(date.substring(6, 8));
  let month = Number(date.substring(3, 5));
  if (month < 4) {
    semester = "WiSe" + (year - 1) + "/" + year;
  } else if (month < 10) {
    semester = "SoSe20" + year;
  } else {
    semester = "WiSe20" + year + "/20" + (year + 1);
  }
  return semester;
};

//Save and process incoming file in database
const saveFile = async (file, res) => {
  const data = fs.readFileSync(file.filepath);
  //Temporarily save incoming file in public folder
  fs.writeFileSync("./public/tempFile.csv", data);
  getFilesInDirectory();
  //Fire up database
  let stream = fs.createReadStream("./public/tempFile.csv");
  let csvData = [];
  let csvStream = fastcsv
    .parse({ delimiter: ";" })
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      //Remove the first line: header
      csvData.shift();
      //get the block name of the upload and the semester
      let uniqueBlock = [];
      let uniqueBlockSemester = [];
      csvData.forEach((row, i) => {
        if (uniqueBlock.indexOf(row[COLUMN_OF_BLOCK]) == -1) {
          uniqueBlock.push(row[COLUMN_OF_BLOCK]);
          uniqueBlockSemester.push(getSemesterFromDate(row[1]));
        }
      });
      console.log(uniqueBlock);
      console.log(uniqueBlockSemester);

      //get the semester of the blocks
      // transformation of data structure (split up blockname and group id)
      const csvlength1 = csvData.length;
      const csvlength2 = csvData[0].length;
      const booleanArray = checkboxValues
        .split(",")
        .map((value) => value === "true");
      const lecturerArray = lecturer.split(",");
      const lecturerMailArray = lecturerMail.split(",");

      const resultArray = csvData.map((row, index) => [
        booleanArray[index],
        ...row,
        lecturerMailArray[lecturerArray.indexOf(row[12])],
        uniqueBlockSemester[uniqueBlock.indexOf(row[6])],
      ]);
      //console.log(resultArray[0]);
      //console.log(booleanArray);

      //Create a new connection to the database
      const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "@UniKoeln123",
        database: "test_db",
      });

      //Open the connection
      connection.connect();
      //Using a TRANSACTION to ensure consistency -> If either of the queries fails, even the last one, all previous queries will be rolled back!
      connection.beginTransaction(function(err) {
        if (err) {
          throw err;
        } else {
          //Try inserting csv data
          //console.log(resultArray);
          connection.query(
            "INSERT INTO csv_sessions (pflichttermin, wochentag, datum, von, bis, dauer_in_minuten, lv_nummer, titel, lv_art, lv_gruppe, ort, ereignis_typ, termin_typ, vortragende_kontaktperson, anmerkung, interne_bemerkung, vortragende_kontaktperson_email, semester) VALUES ?",
            [resultArray],
            function(error, response) {
              if (error) {
                console.error(error.message); // Log the error message
                connection.rollback(function() {
                  console.error("Rollback completed.");
                  return res.status(500).json(error.code);
                });
              } else {
                console.log(response);
                connection.query(
                  "INSERT INTO blocks (block_name, semester) VALUES (?, ?)",
                  [uniqueBlock, uniqueBlockSemester],
                  function(error, response) {
                    if (error) {
                      console.error(error.message); // Log the error message
                      connection.rollback(function() {
                        console.error("Rollback completed.");
                        return res.status(500).json(error.code);
                      });
                    } else {
                      connection.query(
                        "INSERT INTO attendance (block_id, group_name, sess_id, matrikelnummer, lecturer_id) SELECT b.block_id, s.lv_gruppe AS group_name, s.sess_id, c.matrikelnummer, s.vortragende_kontaktperson_email AS lecturer_id FROM csv c INNER JOIN csv_sessions s ON c.Semester = s.semester AND c.Gruppe = s.lv_gruppe INNER JOIN blocks b ON s.titel = b.block_name AND s.semester = b.semester;",
                        function(error, response) {
                          if (error) {
                            console.error(error.message); // Log the error message
                            connection.rollback(function() {
                              console.error("Rollback completed.");
                              return res.status(500).json(error.code);
                            });
                          } else {
                            connection.commit(function(commitError) {
                              if (commitError) {
                                console.error(commitError.message);
                                connection.rollback(function() {
                                  console.error("Rollback completed.");
                                  return res.status(500).json(error.code);
                                });
                              } else {
                                console.log(
                                  "Transaction completed successfully."
                                );
                                return res.status(200).json("SUCCESS");
                              }
                              connection.end(); // Close the connection after the transaction
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      });

      //Delete tempFile after saving to database
      fs.unlinkSync("./public/tempFile.csv");
      getFilesInDirectory();
    });

  stream.pipe(csvStream);

  return;
};

//DEBUGGING function to get current filenames in the public folder, i.e. to check if temporary file (tempFile) has been deleted after use
function getFilesInDirectory() {
  let files = fs.readdirSync("./public/");
}
