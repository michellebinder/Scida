//THIS IS AN EXAMPLE OF HOW TO SECURE AN API BY ACOUNT ROLES
import { getSession } from "next-auth/react";
const mysql = require("mysql2");

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

    //Check if users role is allowed to contact api, here role A (Admin i.e. Dekanat) and B (Beschäftigte i.e Sekretariat) is allowed
    if (role === "scidaDekanat" || role === "scidaSekretariat") {
      const data = req.body.transferData;
      const block_id = data[0].block_id;
      const block_name = data[0].block_name;
      const group_id = data[0].group_id;
      const sess_id = data[0].sess_id;
      //console.log(data);

      //Pre-process the sess_start_time and sess_end_time values
      for (const item of data) {
        const date1 = new Date(item.sess_start_time);
        item.sess_start_time = date1
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        const date2 = new Date(item.sess_end_time);
        item.sess_end_time = date2
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
      }
      //Pre-process data and check for undefined values and send back the undefined values to frontend to highlight
      const undefinedValues = [];

      for (const item of data) {
        if (
          item.lecturer_id == null ||
          item.lecturer_id == undefined ||
          item.sess_type == null ||
          item.sess_type == undefined
        ) {
          //console.log("Error: Undefined or null value found in data");
          if (item.lecturer_id == null || item.lecturer_id == undefined)
            undefinedValues.push("lecturer_id");
          if (item.sess_type == null || item.sess_type == undefined)
            undefinedValues.push("sess_type");
        }
      }

      if (undefinedValues.length > 0) {
        res.status(400).json({ error: "INCOMPLETE", undefinedValues });
        return;
      }

      const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "@UniKoeln123",
        port: 3306,
        database: "test_db",
        timezone: "+00:00", //Use same timezone as in mysql database,
        flags: "-FOUND_ROWS", //Enable found rows for correct logging of changes down below
      });

      connection.beginTransaction(function(err) {
        if (err) {
          console.error(err);
          //Send a 500 Internal Server Error response if there was an error
          return res.status(500).json("ERROR");
        } else {
          let students;
          const sqlStudents =
            "SELECT csv.matrikelnummer FROM csv WHERE Block_name = ? AND Gruppe = ?;";
          connection.query(
            sqlStudents,
            [block_name, group_id, block_id, group_id],
            (error, results) => {
              //If fails, rollback complete transaction
              if (error) {
                connection.rollback(function() {
                  console.error(error.code);
                  console.log("Transaction rolled back");
                  //Send a 500 Internal Server Error response if there was an error
                  return res.status(500).json(error.code);
                });
              } else {
                //console.log(results);
                students = results;

                //Continue with queries
                //Iterate over data and update data if present, else update existing data
                let countOuter = 0;
                data.forEach((row) => {
                  const sqlSessions = `
          INSERT INTO sessions (lecturer_id, block_id, group_id, sess_id, sess_type, sess_start_time, sess_end_time)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE 
            lecturer_id = VALUES(lecturer_id),
            sess_type = VALUES(sess_type),
            sess_start_time = VALUES(sess_start_time),
            sess_end_time = VALUES(sess_end_time)
        `;
                  const values = [
                    row.lecturer_id,
                    row.block_id,
                    row.group_id,
                    row.sess_id,
                    row.sess_type,
                    row.sess_start_time,
                    row.sess_end_time,
                  ];

                  connection.query(sqlSessions, values, (error, results) => {
                    //If fails, rollback complete transaction
                    if (error) {
                      connection.rollback(function() {
                        console.error(error.code);
                        console.log("Transaction rolled back");
                        //Send a 500 Internal Server Error response if there was an error
                        return res.status(500).json(error.code);
                      });
                    } else {
                      //New session inserted
                      if (results.affectedRows == 1) {
                        console.log("session inserted");
                      }
                      //New session updated
                      if (results.affectedRows == 2) {
                        console.log("session updated");
                      }

                      //Check if students even exist or if the group is new, then skip the insert into attendance
                      if (students.length > 0) {
                        let countInner = 0;
                        students.forEach((student) => {
                          const sqlAttendance = `
  INSERT INTO attendance (block_id, group_id, sess_id, matrikelnummer, lecturer_id ) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE lecturer_id = VALUES(lecturer_id)
  `;
                          const valuesAttendance = [
                            row.block_id,
                            row.group_id,
                            row.sess_id,
                            student.matrikelnummer,
                            row.lecturer_id,
                          ];
                          connection.query(
                            sqlAttendance,
                            valuesAttendance,
                            (error, results) => {
                              //If fails, rollback complete transaction
                              if (error) {
                                connection.rollback(function() {
                                  console.error(error.code);
                                  console.log("Transaction rolled back");
                                  //Send a 500 Internal Server Error response if there was an error
                                  return res.status(500).json(error.code);
                                });
                              } else {
                                //New attendance inserted
                                if (results.affectedRows == 1) {
                                  console.log("attendance inserted");
                                }
                                //New attendance updated
                                if (results.affectedRows == 2) {
                                  console.log("attendance updated");
                                }

                                //Increase counter of inner loop
                                countInner++;
                                //If the end of the inner loop is reached, increase counter of outer loop
                                if (countInner == students.length) {
                                  countOuter++;
                                }

                                //If end of outer loop is reached, send http success -> This will ensure that the success is not send too early!
                                if (countOuter == data.length) {
                                  //Commit and approve transaction -> i.e. save data
                                  connection.commit(function(error) {
                                    //If fails, rollback complete transaction
                                    if (error) {
                                      connection.rollback(function() {
                                        console.error(error.code);
                                        console.log("Transaction rolled back");
                                        //Send a 500 Internal Server Error response if there was an error
                                        return res.status(500).json(error.code);
                                      });
                                    } else {
                                      console.log("Transaction Complete.");
                                      return res.status(200).json("SUCCESS");
                                      connection.end();
                                    }
                                  });
                                }
                              }
                            }
                          );
                        });
                      } else {
                        connection.commit(function(error) {
                          //If fails, rollback complete transaction
                          if (error) {
                            connection.rollback(function() {
                              console.error(error.code);
                              console.log("Transaction rolled back");
                              //Send a 500 Internal Server Error response if there was an error
                              return res.status(500).json(error.code);
                            });
                          } else {
                            console.log("Transaction Complete.");
                            return res.status(200).json("SUCCESS");
                            connection.end();
                          }
                        });
                      }
                    }
                  });
                });
              }
            }
          );
        }
      });
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
