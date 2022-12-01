//import the module to transform the posted data
const querystring = require("querystring");
//import mysql module to connect database
const mysql = require("mysql");

export default function handler(req, res) {
  // // Guard clause checks for Mail and Password,
  // // and returns early if they are not found
  if (!req.body.email || !req.body.password) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "Mail or Password not found" });
  }

  //Processing the POST request and Sending a RESPONSE
  const email = req.body.email;
  const password = req.body.password;

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

  connection.query(
    "select account_role from accounts where email=? AND account_pwd=?",
    [email, password],
    (err, results, fields) => {
      try {
        console.log(results[0].account_role);
        if (results[0].account_role == "Sekretariat") {
          res.status(200).json(`SUCCESS , Sekretariat`);
        } else if (results[0].account_role == "Studiendekanat") {
          res.status(200).json(`SUCCESS , Dekanat`);
        } else {
          console.log("if else fehler");
        }
      } catch (err) {
        res.status(200).json(`Benutzername oder Passwort ungültig`);
      }
    }
  );

  // // disconnect database
  // connection.end();
}
