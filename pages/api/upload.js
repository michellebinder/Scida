import formidable from "formidable";
import fs from "fs";
const mysql = require("mysql");
const fastcsv = require("fast-csv");

//Code snippets taken from https://codesandbox.io/s/thyb0?file=/pages/api/file.js and adapted for this usecase and node/fs/formidable version

export const config = {
  api: {
    bodyParser: false,
  },
};

//Process post request
const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function(err, fields, files) {
    await saveFile(files.file);
    return res.status(201).send("");
  });
};

//Save and process incoming file in database
const saveFile = async (file) => {
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

      //Create a new connection to the database
      const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "@UniKoeln123",
        database: "test_db",
      });

      //Open the connection
      connection.connect((error) => {
        if (error) {
          console.error(error);
        } else {
          let query =
            "INSERT INTO mytable (lfdNr, Gruppe, Platz, Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl) VALUES ?";
          connection.query(query, [csvData], (error, response) => {
            console.log(error || response);
          });
        }
      });
    });

  stream.pipe(csvStream);

  //Delete tempFile after saving to database
  fs.unlinkSync("./public/tempFile.csv");
  getFilesInDirectory();
  return;
};

//Function to get current filenames in the public folder - for debugging
function getFilesInDirectory() {
  console.log("\nFiles present in directory:");
  let files = fs.readdirSync("./public/");
  files.forEach(file => {
    console.log(file);
  });
}

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};
