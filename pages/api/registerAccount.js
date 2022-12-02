//import the module to transform the posted data
const querystring = require("querystring");
//import mysql module to connect database
const mysql = require("mysql");

export default function handler(req, res) {
  function makeRandString(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Get data submitted in request's body.
  const body = req.body;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log("body: ", body);

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.firstName || !body.lastName) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "First or last name not found" });
  }

  // Found the name.
  // Sends a HTTP success code
  //res.status(200).json({ data: `${body.firstName} ${body.lastName}` })

  const firstName = body.firstName;
  const lastName = body.lastName;
  const email = body.email;
  const role = body.role;

  const password = "123test"; //makeRandString(10);
  const salt = ""; //makeRandString(3);

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
    "insert into accounts ( first_name, last_name, email, account_pwd, salt, account_role) value (?,?,?,?,?,?)",
    [firstName, lastName, email, password, salt, role],
    (err, results, fields) => {
      //error
       
      console.log()
      if (err) throw err;
      //res.status(200).json(`Der/die Nutzer:in wurde erfolgreich erstellt!`);
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

  // disconnect database
  connection.end();
}