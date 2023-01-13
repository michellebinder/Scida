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
        console.log("Something wrong");
        return res.status(400).json({ data: "Something wrong" });
      }

      const data = req.body.transferData;
      const block_id = data[0].block_id;
      const block_name = data[0].block_name;
      const group_id = data[0].group_id;
      const sess_id = data[0].sess_id;
      console.log(data);

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
          item.lecturer_id == undefined ||
          item.sess_type == undefined ||
          item.sess_start_time == undefined ||
          item.sess_end_time == undefined
        ) {
          console.log("Error: Undefined value found in data");
          if (item.lecturer_id == undefined)
            undefinedValues.push("lecturer_id");
          if (item.sess_type == undefined) undefinedValues.push("sess_type");
          if (item.sess_start_time == undefined)
            undefinedValues.push("sess_start_time");
          if (item.sess_end_time == undefined)
            undefinedValues.push("sess_end_time");
        }
      }

      if (undefinedValues.length > 0) {
        console.log(undefinedValues);
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

      //Get all students for current group
      let students;
      const sqlStudents =
        "SELECT matrikelnummer FROM csv WHERE Block_name = ? AND Gruppe = ?";
      connection.query(
        sqlStudents,
        [block_name, group_id],
        (error, results) => {
          if (error) {
            console.log("Error inserting data:", error);
            //Send a 500 Internal Server Error response if there was an error
            res.status(500).json("ERROR");
            return;
          } else {
            console.log(results);
            students = results;
          }
        }
      );

      //Iterate over data and update data if present, else update existing data
      data.forEach((row) => {
        const sql = `
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

        connection.query(sql, values, (error, results) => {
          if (error) {
            console.log("Error inserting data:", error);
            //Send a 500 Internal Server Error response if there was an error
            res.status(500).json("ERROR");
            return;
          }

          //New row inserted
          if (results.affectedRows == 1) {
            console.log("row inserted");
            //Insert attendance
            students.forEach((student) => {
              const sql =
                "INSERT INTO attendance (block_id, group_id, sess_id, matrikelnummer, lecturer_id ) VALUES (?, ?, ?, ?, ?)";
              const values = [
                row.block_id,
                row.group_id,
                row.sess_id,
                student.matrikelnummer,
                row.lecturer_id,
              ];
              connection.query(sql, values, (error, results) => {
                if (error) {
                  console.log("Error inserting data:", error);
                  // Send a 500 Internal Server Error response if there was an error
                  res.status(500).json("ERROR");
                  return;
                }
              });
            });
          }
          //New row updated
          if (results.affectedRows == 2) {
            console.log("row updated");
            //Update attendance
            students.forEach((student) => {
              const sql =
                "UPDATE attendance SET lecturer_id=? WHERE block_id=? AND group_id=? AND sess_id=? AND matrikelnummer=?";
              const values = [
                row.lecturer_id,
                row.block_id,
                row.group_id,
                row.sess_id,
                student.matrikelnummer,
              ];
              connection.query(sql, values, (error, results) => {
                if (error) {
                  console.log("Error inserting data:", error);
                  // Send a 500 Internal Server Error response if there was an error
                  res.status(500).json("ERROR");
                  return;
                }
              });
            });
          }
        });
      });
      //Send a 200 OK response AFTER updating the database
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
