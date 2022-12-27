//import the module to transform the posted data
const querystring = require("querystring");
//import mysql module to connect database
const mysql = require("mysql2");

export default function handler(req, res) {
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
      res.status(200).json(`${results}`);
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
