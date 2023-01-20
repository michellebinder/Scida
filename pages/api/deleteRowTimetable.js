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
      if (!req.body) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: "Something wrong" });
      }

      const body = req.body;
      const block_id = body.selectedBlock_id;
      const group_id = body.selectedGroup_id;
      const sess_id = body.selectedSess_id;

      const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "@UniKoeln123",
        port: 3306,
        database: "test_db",
        timezone: "+00:00", //Use same timezone as in mysql database
      });

      const sqlQuery1 =
        "DELETE FROM sessions WHERE block_id = ? AND group_id = ? AND sess_id = ? ";
      const sqlQuery2 =
        "DELETE FROM attendance WHERE block_id = ? AND group_id = ? AND sess_id = ? ";

      //Start ACID transaction to perform two DELETEs -> if one DELETE fails, the transaction will be reverted and no information is lost
      connection.beginTransaction(function(err) {
        if (err) {
          console.error(err);
          //Send a 500 Internal Server Error response if there was an error
          return res.status(500).json("ERROR");
        } else {
          //Delete a record in the sessions table
          connection.query(sqlQuery1, [block_id, group_id, sess_id], function(
            error,
            results,
            fields
          ) {
            //If fails, rollback transaction
            if (error) {
              connection.rollback(function() {
                console.error(error.code);
                //Send a 500 Internal Server Error response if there was an error
                return res.status(500).json(error.code);
              });
            } else {
              //Delete a record in the attendance table
              connection.query(
                sqlQuery2,
                [block_id, group_id, sess_id],
                function(error, results, fields) {
                  //If fails, rollback transaction
                  if (error) {
                    connection.rollback(function() {
                      console.error(error.code);
                      //Send a 500 Internal Server Error response if there was an error
                      return res.status(500).json(error.code);
                    });
                  } else {
                    connection.commit(function(error) {
                      //If fails, rollback complete transaction
                      if (error) {
                        connection.rollback(function() {
                          console.error(error.code);
                          //Send a 500 Internal Server Error response if there was an error
                          return res.status(500).json(error.code);
                        });
                      } else {
                        return res.status(200).json("SUCCESS");
                        connection.end();
                      }
                    });
                  }
                }
              );
            }
          });
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
