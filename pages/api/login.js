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
  if (req.method === "POST"){
    const email = req.body.email
    const password = req.body.password
    //TODO(!): Instead of returning the credentials, you could return whether the credentials exist or not
    res.status(200).json(`eingegebene Email:${email}--eingegebenes Passwort:${password}`)
  }

  // const email = body.email;
  // const password = body.password;

  // //database information
  // const connection = mysql.createConnection({
  //   host: "127.0.0.1",
  //   user: "root",
  //   password: "@UniKoeln123",
  //   port: 3306,
  //   database: "test_db",
  // });
  // //connect database
  // connection.connect();
  // //content query

  // connection.query(
  //   "select role from account where username=? AND password=?",
  //   [email, password],
  //   (err, results, fields) => {
  //     console.log(results);
  //     if (err) throw err;
  //     res.end();
  //   }
  // );

  // // disconnect database
  // connection.end();
}
