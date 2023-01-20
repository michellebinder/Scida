//import the module to transform the posted data
const querystring = require("querystring");
//import mysql module to connect database
const mysql = require("mysql2");
//Import nextauth to secure the api
import { getSession } from "next-auth/react";
import makeRandString from "../../gloabl_functions/randString";

//Seperate api that allows user (except LDAP) to change their password
//Essentially the same as the updatePassword api, but without the id as an request parameter
//Instead we recieve the id INSIDE THE API from the session, in order to prevent user from changing the passwords of other users (e.g. via Postman)
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

    //Check if users role is allowed to contact api, here role scidaDekanat (Dekanat) and scidaSekretariat (Sekretariat) and "B" ("Beschäftigte" i.e. Lecturer) is allowed
    if (
      role === "scidaDekanat" ||
      role === "scidaSekretariat" ||
      role === "B"
    ) {
      //KEY DIFFERENCE
      const id = session.user.account_id;

      if (req.body == null) {
        res.status(500).json("FAIL CODE 1");
      } else {
        const body = req.body;
        const password = body.hashHex;

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
          "UPDATE accounts SET account_pwd=? WHERE account_id=?",
          [password, id],
          (err, results, fields) => {
            //Error handling
            if (err) {
              res.status(500).json(`FAIL CODE 2`);
            } else {
              res.status(200).json(`SUCCESS`);
            }
            res.end();
          }
        );

        // disconnect database
        connection.end();
      }
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
