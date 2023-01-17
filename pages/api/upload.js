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

    //Check if users role is allowed to contact api, here role A (Admin i.e. Dekanat) and B (Beschäftigte i.e Sekretariat) is allowed
    if (role === "scidaDekanat" || role === "scidaSekretariat") {
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
      try {
        for (let i = 0; i < csvlength1; i++) {
          for (let j = csvlength2; j >= 0; j--) {
            if (j == 0) {
              //nothing changes
            } else if (j == 1) {
              csvData[i][j] = csvData[i][j].substring(
                0,
                csvData[i][j].length - 10
              );
            } else if (j == 2) {
              csvData[i][j] = csvData[i][j - 1].substring(
                csvData[i][j - 1].length - 2,
                csvData[i][j - 1].length
              );
            } else {
              csvData[i][j] = csvData[i][j - 1];
            }
          }
        }

        for (let i = 0; i < csvlength1; i++) {
          for (let j = csvlength2; j >= 0; j--) {
            csvData[i][csvlength2 + 1] = semester;
          }
        }
        /* *
      select distinct blocknames from uploaded csv file 
      */
        for (let i = 0; i < csvlength1; i++) {
          blocknames.push(csvData[i][1]);
        }
        //console.log("blocknames:");
        blocknames = remove_duplicates(blocknames);
        //console.log(blocknames);
      } catch {
        //Delete tempFile after saving to database
        fs.unlinkSync("./public/tempFile.csv");
        getFilesInDirectory();
      }

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
            "INSERT INTO csv (lfdNr, Block_name, Gruppe, Platz, Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl, Semester) VALUES ?",
            [csvData],
            function(error, response) {
              if (error) {
                connection.rollback(function() {
                  console.error(error.code);
                  console.log("Transaction rolled back");
                  //Send a 500 Internal Server Error response if there was an error
                  return res.status(500).json(error.code);
                });
              } else {
                //Try extracting blocks
                let query2 =
                  "INSERT INTO blocks (block_name, semester) VALUES (?," +
                  "'" +
                  semester +
                  "'" +
                  ")";
                let counter1 = 0;
                for (let i = 0; i < blocknames.length; i++) {
                  connection.query(query2, blocknames[i], function(
                    error,
                    response
                  ) {
                    //If fails, rollback complete transaction
                    if (error) {
                      connection.rollback(function() {
                        console.error(error.code);
                        console.log("Transaction rolled back");
                        //Send a 500 Internal Server Error response if there was an error
                        return res.status(500).json(error.code);
                      });
                    } else {
                      counter1++;
                      //Execute following code after loop is done
                      if (counter1++ == blocknames.length) {
                        console.log("Loop 1 done");
                        //Try selecting all relevant blocks
                        connection.query(
                          "select distinct blocks.block_id, csv.Gruppe from blocks inner join csv on blocks.block_name=csv.Block_name;",
                          (error, results, fields) => {
                            //If fails, rollback complete transaction
                            if (error) {
                              connection.rollback(function() {
                                console.error(error.code);
                                console.log("Transaction rolled back");
                                //Send a 500 Internal Server Error response if there was an error
                                return res.status(500).json(error.code);
                              });
                            } else {
                              //Try creating initial sessions
                              console.log(results);
                              let counter2 = 0;
                              for (let i = 0; i < results.length; i++) {
                                const query4 =
                                  "INSERT INTO sessions (block_id,group_id , sess_id ,sess_start_time,sess_end_time, lecturer_id, sess_type) VALUES (" +
                                  results[i].block_id +
                                  ",'" +
                                  results[i].Gruppe +
                                  "'," +
                                  i +
                                  ",'2000-01-01 00:00:00','2000-01-01 00:00:00','', '');";
                                connection.query(query4, (error, response) => {
                                  //If fails, rollback complete transaction
                                  if (error) {
                                    connection.rollback(function() {
                                      console.error(error.code);
                                      console.log("Transaction rolled back");
                                      //Send a 500 Internal Server Error response if there was an error
                                      return res.status(500).json(error.code);
                                    });
                                  } else {
                                    counter2++;
                                    //Execute following code after loop is done
                                    if (counter2++ == blocknames.length) {
                                      console.log("Loop 2 done");
                                      //Commit and approve transaction -> i.e. save data
                                      connection.commit(function(err) {
                                        //If fails, rollback complete transaction
                                        if (error) {
                                          connection.rollback(function() {
                                            console.error(error.code);
                                            console.log(
                                              "Transaction rolled back"
                                            );
                                            //Send a 500 Internal Server Error response if there was an error
                                            return res
                                              .status(500)
                                              .json(error.code);
                                          });
                                        } else {
                                          console.log("Transaction Complete.");
                                          return res
                                            .status(200)
                                            .json("SUCCESS");
                                          connection.end();
                                        }
                                      });
                                    }
                                  }
                                });
                              }
                            }
                          }
                        );
                      }
                    }
                  });
                }
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
  //console.log("\nFiles present in directory:");
  let files = fs.readdirSync("./public/");
  files.forEach((file) => {
    //console.log(file);
  });
}
