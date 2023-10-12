import formidable from "formidable";
import fs from "fs";
const mysql = require("mysql2");
const fastcsv = require("fast-csv");
//Import nextauth to secure the api
import { getSession } from "next-auth/react";
import { remove_duplicates } from "../../gloabl_functions/array";

//Code snippets taken from https://codesandbox.io/s/thyb0?file=/pages/api/file.js and adapted for this usecase and node/fs/formidable version

// Value for the semester which has been entered by the user
let semester = "";

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

    // Save the semester value which has been entered in the frontend
    semester = req.headers.semester;

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
  let csvStream = fastcsv
    .parse({ delimiter: ";" })
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      //Remove the first line: header
      csvData.shift();
      const resultArray = csvData.map((row, index) => [...row, semester]);
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
            "INSERT INTO csv (lfdNr, Gruppe, Platz, Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl, Semester) VALUES ?",
            [resultArray],
            function(error, response) {
              if (error) {
                connection.rollback(function() {
                  console.error(error.code);
                  //Send a 500 Internal Server Error response if there was an error
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
