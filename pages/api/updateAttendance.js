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
    if (
      role === "scidaDekanat" ||
      role === "scidaSekretariat" ||
      role === "B"
    ) {
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
          "UPDATE attendance SET confirmed_at=? WHERE matrikelnummer=? AND block_id=? AND sess_id=? AND group_name=?",
          [
            confirmedAt,
            data[row].matrikelnummer,
            data[row].block_id,
            data[row].sess_id,
            data[row].group_name,
          ],
          (err, results, fields) => {
            //error
            console.log(results);
            if (err) {
              resSuccess = false;
            }
            res.end();
          }
        );
      }
      res.status(200).json(resSuccess ? `SUCCESS` : `FAIL CODE 8`);

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
