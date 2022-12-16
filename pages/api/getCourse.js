//THIS API WAS REPLACED BY GETSERVERSIDEPROBS DIRECTLY IN COURSELISTSTUDENT.JS!!

const mysql = require("mysql");

export default function handler(req, res) {
  const sqlQuery =
    "SELECT blocks.block_name,blocks.group_id,blocks.date_start,blocks.date_end,attendance.*,timetable.sess_id,timetable.sess_type,timetable.sess_time FROM blocks INNER JOIN attendance  ON blocks.block_id = attendance.block_id AND attendance.student_username = ? LEFT JOIN timetable ON timetable.block_id = blocks.block_id AND timetable.sess_id = attendance.sess_id INNER JOIN mytable_fake ON  blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe AND mytable_fake.Matrikelnummer = ?";

  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "@UniKoeln123",
    port: 3306,
    database: "test_db",
  });

  connection.connect(function(err) {
    if (err) throw err;
    connection.query(
      sqlQuery,
      ["mmuster", "5558107" /* usr, matri */],
      function(err, results, fields) {
        if (err) throw err;
        let dataString = JSON.stringify(results);

        res.status(200).json(`${dataString}`);
      }
    );
  });
}
