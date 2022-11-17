const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("./testData/klips_Matrikelnummer.csv");
let csvData = [];
let csvStream = fastcsv
  .parse({delimiter:";"})
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "@UniKoeln123",
      database: "test_db"
    });

    // open the connection
    connection.connect(error => {
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

