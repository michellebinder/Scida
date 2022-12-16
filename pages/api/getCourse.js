//THIS API WAS REPLACED BY GETSERVERSIDEPROBS DIRECTLY IN COURSELISTSTUDENT.JS!!

const mysql = require("mysql");

export default function handler(req, res) {
  const sqlQuery =
    "SELECT blocks.block_name,blocks.block_id,blocks.group_id,blocks.date_start,blocks.date_end FROM blocks INNER JOIN mytable ON blocks.block_name = mytable.Block_name AND blocks.group_id = mytable.Gruppe WHERE mytable.Matrikelnummer = ?;";

  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "@UniKoeln123",
    port: 3306,
    database: "test_db",
  });

  connection.connect(function(err) {
    if (err) throw err;
    connection.query(sqlQuery, ["5558107" /* usr, matri */], function(
      err,
      results,
      fields
    ) {
      if (err) throw err;
      let dataString = JSON.stringify(results);

      res.status(200).json(`${dataString}`);
    });
  });
}
