//import the module to transform the posted data
const querystring = require("querystring");
//import mysql module to connect database
const mysql = require("mysql2");
//Import nextauth to secure the api
import { getSession } from "next-auth/react";

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
      // Get data submitted in request's body.
      const body = req.body;

      // Optional logging to see the responses
      // in the command line where next.js app is running.

      // Guard clause checks for first and last name,
      // and returns early if they are not found
      if (!body.firstName || !body.lastName) {
        // Sends a HTTP bad request error code
        return res.status(500).json({ data: "First or last name not found" });
      }

      const firstName = body.firstName;
      const lastName = body.lastName;
      const email = body.email;
      const role = body.role;
      const password = body.hashHex;

      //database information
      const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "@UniKoeln123",
        port: 3306,
        database: "test_db",
        timezone: "+00:00", //Use same timezone as in mysql database
      });
      //connect database
      connection.connect();
      //content query
      connection.query(
        "insert into accounts ( first_name, last_name, email, account_pwd, account_role) value (?,?,?,?,?)",
        [firstName, lastName, email, password, role],
        (err, results, fields) => {
          //error
          if (err) {
            res.status(500).json(`FAIL CODE 1`);
          } else {
            res.status(200).json(`SUCCESS`);
          }
          res.end();
        }
      );

      // disconnect database
      connection.end();
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
