//import the module to transform the posted data
const querystring = require("querystring");
//import mysql module to connect database
const mysql = require("mysql2");

export default function handler(req, res) {
  // // Guard clause checks for Mail and Password,
  // // and returns early if they are not found
  if (!req.body.search) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "Mail or Password not found" });
  }

  //Processing the POST request and Sending a RESPONSE
  const search = req.body.search;

  // const email = body.email;
  // const password = body.password;

  // //database information
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
  const searchLike = "%" + search + "%";

  connection.query(
    "SELECT * FROM accounts WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR account_role LIKE ?;",
    [searchLike, searchLike, searchLike, searchLike],
    (err, results, fields) => {
      try {
        //results.map((x) => (<p>{x.first_name}</p>))
        let resString =
          results[0].first_name +
          ";" +
          results[0].last_name +
          ";" +
          results[0].email +
          ";" +
          results[0].account_role +
          ";" +
          results[0].account_id;
        res.status(200).json(`${resString}`);
        console.log(test);
      } catch (err) {
        res.status(200).json(`FAIL CODE 3`);
      }
    }
  );

  // // disconnect database
  // connection.end();
}
