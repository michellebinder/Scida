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
    if (role === "A" || role === "B") {
      if (!req.body) {
        // Sends a HTTP bad request error code
        console.log("Something wrong");
        return res.status(400).json({ data: "Something wrong" });
      }

      const data = req.body.transferData;
      console.log(data);

      // pre-process the sess_start_time and sess_end_time values
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

      const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "@UniKoeln123",
        port: 3306,
        database: "test_db",
        timezone: "+00:00", //Use same timezone as in mysql database
      });

      for (const item of data) {
        // Get the current rows in the sessions table
        const sqlQuery1 = "SELECT * FROM sessions WHERE block_id = ?";
        connection.query(sqlQuery1, [item.block_id], function(err, results) {
          if (err) {
            //Send a 500 Internal Server Error response if there was an error
            res.status(500).json("ERROR");
            return;
          }
          const currentRows = results;

          // For each row in the currentRows array, check if it exists in the data array. If it does not exist, delete it.
          for (const currentRow of currentRows) {
            let rowExists = false;
            for (const updatedRow of data) {
              if (currentRow.sess_id === updatedRow.sess_id) {
                rowExists = true;
                break;
              }
            }
            if (!rowExists) {
              // Delete the row
              const sqlQuery2 =
                "DELETE FROM sessions WHERE block_id = ? AND sess_id = ?";
              connection.query(
                sqlQuery2,
                [item.block_id, currentRow.sess_id],
                function(err, results) {
                  if (err) {
                    //Send a 500 Internal Server Error response if there was an error
                    res.status(500).json("ERROR");
                    return;
                  }
                }
              );
            }
          }

          //By adding the AND to the WHERE statement, we only update when changes are actually present
          const sqlQuery3 =
            "UPDATE sessions SET lecturer_id = ?, sess_type = ?, sess_start_time = ?, sess_end_time = ? WHERE block_id = ? AND sess_id = ? AND (lecturer_id != ? OR sess_type != ? OR sess_start_time != ? OR sess_end_time != ?)"; //TODO: Add group_id as WHERE attribute

          // update the database
          connection.query(
            sqlQuery3,
            [
              item.lecturer_id,
              item.sess_type,
              item.sess_start_time,
              item.sess_end_time,
              item.block_id,
              item.sess_id,
              item.lecturer_id,
              item.sess_type,
              item.sess_start_time,
              item.sess_end_time,
            ],
            function(err, results) {
              if (err) {
                //Send a 500 Internal Server Error response if there was an error
                res.status(500).json("ERROR");
                return;
              }
            }
          );
        });
      }

      //Send a 200 OK response AFTER updating the database - not doing it inside the for loop
      res.status(200).json("SUCCESS");
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
