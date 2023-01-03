//IS THIS API STILL NEEDED OR WILL IT BE REPLACED BY GETSERVERSIDEPROPS?

const mysql = require("mysql2");
const blockname = [];
const groupnumber = [];
const blockIDQuery = [];
const blockID = [];

export default function handler(req, res) {
  //please send a true couseID (which exists in our table "blocks") from Frontpage and configure this part
  if (!req.body) {
    // Sends a HTTP bad request error code
    console.log("Something wrong");
    return res.status(400).json({ data: "Something wrong" });
  }

  const courseID = req.body.courseID;

  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "@UniKoeln123",
    port: 3306,
    database: "test_db",
  });

  const sqlQuery =
    "SELECT blocks.block_name,blocks.group_id,sessions.* FROM blocks INNER JOIN sessions ON blocks.block_id = sessions.block_id WHERE blocks.block_id = ?";

  connection.connect(function(err) {
    if (err) throw err;
    connection.query(sqlQuery, [/* '0123' */ courseID], function(
      err,
      results,
      fields
    ) {
      if (err) throw err;
      let dataString = JSON.stringify(results);
      let data = JSON.parse(dataString);
      console.log(data);
      /* res.status(200).json(data); */
      res.status(200).json(data);
    });
  });
}
