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

      const data = req.body.transferData;
      const block_id = data[0].block_id;

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

      // update the database
      let affectedRows = 0;
      connection.query(
        "SELECT * from sessions WHERE block_id = ?", //Select all entries
        [block_id],
        function(err, results) {
          if (err) {
            //Send a 500 Internal Server Error response if there was an error
            res.status(500).json("ERROR");
            return;
          }
          if (results.length < data.length) {
            connection.query(
              "INSERT INTO sessions (lecturer_id, block_id, sess_id, sess_type, sess_start_time, sess_end_time) VALUES (?,?,?,?,?,?);",
              [
                data.lecturer_id[data.length - 1],
                data.sess_type[data.length - 1],
                data.sess_start_time[data.length - 1],
                data.sess_end_time[data.length - 1],
                data.block_id[data.length - 1],
                data.sess_id[data.length - 1],
                data.lecturer_id[data.length - 1],
                data.sess_type[data.length - 1],
                data.sess_start_time[data.length - 1],
                data.sess_end_time[data.length - 1],
              ],
              function(err, results) {
                if (err) {
                  //Send a 500 Internal Server Error response if there was an error
                  res.status(500).json("ERROR");
                  return;
                }
                //Send a 200 OK response AFTER updating the database - not doing it inside the for loop
                res.status(200).json("SUCCESS");
              }
            );
          }
          //   affectedRows += results.affectedRows;
          //   if (data === data[data.length - 1]) {
          //     console.log(affectedRows + " rows updated");
          //   }
        }
      );
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
