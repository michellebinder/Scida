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

//Save and process incoming file in database
const saveFile = async (file, res) => {
  const data = fs.readFileSync(file.filepath);
  //Temporarily save incoming file in public folder
  fs.writeFileSync("./public/tempFile.csv", data);
  getFilesInDirectory();
  //Fire up database
  let stream = fs.createReadStream("./public/tempFile.csv");
  let csvData = [];
  let blocknames = [];
  let csvStream = fastcsv
    .parse({ delimiter: ";" })
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      //Remove the first line: header
      csvData.shift();
      // transformation of data structure (split up blockname and group id)
      const csvlength1 = csvData.length;
      const csvlength2 = csvData[0].length;
      const booleanArray = checkboxValues
        .split(",")
        .map((value) => value === "true");
      console.log("csvData");

      const resultArray = csvData.map((row, index) => [
        booleanArray[index],
        ...row,
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
          connection.query(
            "INSERT INTO csv_sessions (pflichttermin, wochentag, datum, von, bis, dauer_in_minuten, lv_nummer, titel, lv_art, lv_gruppe, ort, ereignis_typ, termin_typ, vortragende_kontaktperson, anmerkung, interne_bemerkung) VALUES ?",
            [resultArray],
            function(error, response) {
              if (error) {
                console.error(error.message); // Log the error message
                connection.rollback(function() {
                  console.error("Rollback completed.");
                  return res
                    .status(500)
                    .json({ error: "Internal Server Error" });
                });
              } else {
                console.log(response);
                connection.commit(function(commitError) {
                  if (commitError) {
                    console.error(commitError.message);
                    connection.rollback(function() {
                      console.error("Rollback completed.");
                      return res
                        .status(500)
                        .json({ error: "Internal Server Error" });
                    });
                  } else {
                    console.log("Transaction completed successfully.");
                    return res.status(200).json("SUCCESS");
                  }
                  connection.end(); // Close the connection after the transaction
                });
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
