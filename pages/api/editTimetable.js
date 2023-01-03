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
      });

      const sqlQuery =
        "UPDATE sessions SET lecturer_id = ?, sess_type = ?, sess_start_time = ?, sess_end_time = ? WHERE block_id = ? AND sess_id = ? "; //TODO: Add group_id as WHERE attribute

      // update the database
      for (const item of data) {
        connection.query(
          sqlQuery,
          [
            item.lecturer_id,
            item.sess_type,
            item.sess_start_time,
            item.sess_end_time,
            item.block_id,
            item.sess_id,
          ],
          function(err, results) {
            if (err) throw err;
            console.log(results.affectedRows + " rows updated");
          }
        );
      }
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
