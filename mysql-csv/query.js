const fs = require("fs");
const mysql = require("mysql");

export default function ConnectDatabaseWithQuery(userData) {
  var keys = {};
  var i = 0;
  for (var user in userData) {
    keys[i] = user;
    i++;
  }
  var sqlQuery = "";
  sqlQuery =
    "INSERT INTO account (" +
    keys[0] +
    "," +
    keys[1] +
    ", " +
    keys[2] +
    "," +
    keys[3] +
    ") VALUES ('" +
    userData[keys[0]] +
    "','" +
    userData[keys[1]] +
    "','" +
    userData[keys[2]] +
    "','" +
    userData[keys[3]] +
    "');";

  console.log(sqlQuery);

  /**
   * sqlQuery has a sql query with all Data given to create an account
   */

  /*
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "@UniKoeln123",
    database: "test_db",
  });

  // open the connection
  connection.connect((error) => {
    if (error) {
      console.error(error);
    } else {
      let query = sql;
      connection.query(query, (error, response) => {
        console.log(error || response);
      });
    }
  });
  */
}
