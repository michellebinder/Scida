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
      // // Guard clause checks for Mail and Password,
      // // and returns early if they are not found
      if (!req.body.search) {
        // Sends a HTTP bad request error code
        return res.status(500).json({ data: "Mail or Password not found" });
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
        timezone: "+00:00", //Use same timezone as in mysql database
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
            let resString = "";
            for (let i = 0; i < results.length; i++) {
              resString +=
                results[i].first_name +
                "," +
                results[i].last_name +
                "," +
                results[i].email +
                "," +
                results[i].account_role +
                "," +
                results[i].account_id +
                ";";
            }
            res.status(200).json(`${resString}`);
          } catch (err) {
            res.status(500).json(`FAIL CODE 3`);
          }
        }
      );

      // // disconnect database
      // connection.end();
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
