//import the module to transform the posted data
const querystring = require("querystring");
//import mysql module to connect database
const mysql = require("mysql2");
//Import nextauth to secure the api
import { getSession } from "next-auth/react";

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
      // Get data submitted in request's body.
      const body = req.body;
      const newGroupId = body.newGroupId;
      const groupId = body.oldGroupId;
      const blockId = body.blockId;
      const blockName = body.courseName;

      //database information
      const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "@UniKoeln123",
        port: 3306,
        database: "test_db",
      });
      //connect database
      connection.connect();

      //ACID TRANSACTION
      connection.beginTransaction(function(err) {
        if (err) {
          console.error(err);
          //Send a 500 Internal Server Error response if there was an error
          return res.status(500).json("ERROR");
        } else {
          connection.query(
            "UPDATE attendance SET group_id=? WHERE group_id=? AND block_id=?",
            [newGroupId, groupId, blockId],
            function(error, results, fields) {
              //If fails, rollback transaction
              if (error) {
                connection.rollback(function() {
                  console.error(error.code);
                  console.log("Transaction rolled back");
                  //Send a 500 Internal Server Error response if there was an error
                  return res.status(500).json("FAIL CODE 11");
                });
              } else {
                connection.query(
                  "UPDATE sessions SET group_id=? WHERE group_id=? AND block_id=?",
                  [newGroupId, groupId, blockId],
                  function(error, results, fields) {
                    //If fails, rollback transaction
                    if (error) {
                      connection.rollback(function() {
                        console.error(error.code);
                        console.log("Transaction rolled back");
                        //Send a 500 Internal Server Error response if there was an error
                        return res.status(500).json("FAIL CODE 12");
                      });
                    } else {
                      connection.query(
                        "UPDATE csv SET Gruppe=? WHERE Gruppe=? AND Block_name=?",
                        [newGroupId, groupId, blockName],
                        function(error, results, fields) {
                          if (error) {
                            connection.rollback(function() {
                              console.error(error.code);
                              console.log("Transaction rolled back");
                              //Send a 500 Internal Server Error response if there was an error
                              return res.status(500).json("FAIL CODE 12");
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
                      );
                    }
                  }
                );
              }
            }
          );
        }
      });

      ////////////////

      connection.query(
        "UPDATE csv SET Gruppe=? WHERE Gruppe=? AND Block_name=?",
        [newGroupId, groupId, blockName],
        (err, results, fields) => {
          //error
          if (err) throw err;
          if (err) {
            response = "FAIL CODE 12";
          }
          res.end();
        }
      );
      res.status(200).json(`${response}`);
      // disconnect database
      connection.end();
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
