//import the module to transform the posted data
const querystring = require("querystring");
//import mysql module to connect database
const mysql = require("mysql2");

export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;

  const id = body.editId;
  const firstName = body.editFirstName;
  const lastName = body.editLastName;
  const email = body.editEmail;
  const role = body.editRole;

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
  connection.query(
    "UPDATE accounts SET first_name=?, last_name=?, email=?, account_role=? WHERE account_id=?",
    [firstName, lastName, email, role, id],
    (err, results, fields) => {
      //error
      res.status(200).json(`${results}`);
      if (err) {
        res.status(200).json(`FAIL`);
      }
      if (err) throw err;
      res.end();
    }
  );

  // disconnect database
  connection.end();
}
