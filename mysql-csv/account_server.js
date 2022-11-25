const http = require("http");
//import the module to transform the posted data
const querystring = require("querystring");
//import mysql module to connect database
const mysql = require("mysql");
const server = http.createServer((req, res) => {
  let postVal = "";
  req.on("data", (chunk) => {
    //original data, not the format we want to use
    postVal += chunk;
  });
  req.on("end", () => {
    //data transformation
    let formVal = querystring.parse(postVal);
    let firstName = formVal.firstName;
    let lastName = formVal.lastName;
    let email = formVal.email;
    let role = formVal.role;
    //for test
    res.write(postVal);
    res.end();

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
      "insert into account value (?,?,?,?,?)",
      [0, firstName, lastName, email, role],
      (err, results, fields) => {
        //error
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

    //disconnect database
    connection.end();
  });
});

server.listen(8080);
