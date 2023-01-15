//import the module to transform the posted data
const querystring = require("querystring");
//import mysql module to connect database
const mysql = require("mysql2");

export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;

  const data = body.data;

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
  //content query
  let resSuccess = true;
  //Change every confirmed_at from the new data matching the student
  for (let row in data) {
    const confirmedAt = data[row].confirmed_at
      ? data[row].confirmed_at.substring(0, 10)
      : null;
    connection.query(
      "UPDATE attendance SET confirmed_at=? WHERE matrikelnummer=? AND block_id=? AND sess_id=? AND group_id=?",
      [
        confirmedAt,
        data[row].matrikelnummer,
        data[row].block_id,
        data[row].sess_id,
        data[row].group_id,
      ],
      (err, results, fields) => {
        //error
        if (err) {
          resSuccess = false;
          //console.log(err);
        }
        if (err) throw err;
        res.end();
      }
    );
  }
  res.status(200).json(resSuccess ? `SUCCESS` : `FAIL CODE 8`);

  // disconnect database
  connection.end();
}
