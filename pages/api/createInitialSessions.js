const mysql = require("mysql2");
//THIS IS AN EXAMPLE OF HOW TO SECURE AN API BY ACOUNT ROLES
import { getSession } from "next-auth/react";
import { remove_duplicates } from "../../gloabl_functions/array";

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

    //Check if users role is allowed to contact api, here role A (Admin i.e. Dekanat) is allowed
    if (role === "scidaDekanat" || role == "scidaSekretariat") {
      // Get data submitted in request's body.
      //console.log("hier bin ich");
      const body = req.body;

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
      //Get all blocks
      connection.query(
        "select distinct blocks.block_id, csv.Gruppe from blocks inner join csv on blocks.block_name=csv.Block_name;",
        (err, results, fields) => {
          for (let i = 0; i < results.length; i++) {
            const query4 =
              "INSERT INTO sessions (block_id,group_id , sess_id ,sess_start_time,sess_end_time, lecturer_id, sess_type) VALUES (" +
              results[i].block_id +
              ",'" +
              results[i].Gruppe +
              "'," +
              i +
              ",'2000-01-01 00:00:00','2000-01-01 00:00:00','', '');";
            connection.query(query4, (error, response) => {
              if (error) {
                //console.log(error);
                return res.status(500).json(error.code);
              } else {
                //console.log(response);
              }
            });
          }
          res.status(200).json("SUCCESS");
        }
      );
      //console.log("res");
      //console.log(res);
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
