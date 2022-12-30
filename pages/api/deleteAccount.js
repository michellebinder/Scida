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
    if (role === "A" || role ==="B") {
      // Get data submitted in request's body.
      const body = req.body;
      const id = body.id;

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
        "DELETE FROM accounts WHERE account_id=?",
        [id],
        (err, results, fields) => {
          //error
          res.status(200).json(`SUCCESS`);
          if (err) throw err;
          if (err) {
            res.status(200).json(`FAIL CODE 4`);
          }
          res.end();

          /* //data returned by database
			//if no such data existed in this database,
			//a empty array with be returned(looks like this: []),
			//and length of results would be zero 
			if(results.length >0){
				//utf-8, avoid incorrect encoding (hopefully)
				res.writeHead(200,{'Content-Type':"text/html;charset = utf-8"})

				res.write('you logged in!');
				res.end();
			} */
        }
      );
      /*
      connection.query(
        "select * from account",
        (err, results, fields) => {
          //error
          console.log(results);
          if (err) throw err;
          res.end();
  
          /* //data returned by database
        //if no such data existed in this database,
        //a empty array with be returned(looks like this: []),
        //and length of results would be zero 
        if(results.length >0){
          //utf-8, avoid incorrect encoding (hopefully)
          res.writeHead(200,{'Content-Type':"text/html;charset = utf-8"})
  
          res.write('you logged in!');
          res.end();
        } 
        }
        
    );*/

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
