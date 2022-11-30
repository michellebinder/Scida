//import the module to transform the posted data
const querystring = require("querystring");
//import mysql module to connect database
const mysql = require("mysql");

export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log("body: ", body);

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.firstName || !body.lastName) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "First or last name not found" });
  }

  const email = body.email;
  const password = body.password;

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
    "select role from account where username=? AND password=?",
    [email, password],
    (err, results, fields) => {
      console.log(results);
      if (err) throw err;
      res.end();
    }
  );

  // disconnect database
  connection.end();
}
