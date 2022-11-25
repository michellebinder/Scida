const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "@UniKoeln123",
  database: "test_db",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app
  .post("/api/insert", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const role = req.body.role;

    const sqlInsert = "INSERT into account VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [firstName, lastName, email, role], (err, result) => {
      console.log(result);
    });
  })
  .then((response) => {
    console.log(response);
  })
  .catch();

app.listen(8080, () => {
  console.log("server running on 8080");
});
