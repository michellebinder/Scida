const mysql = require("mysql2");
import { Parser } from 'json2csv';
import fs from "fs";




export default function handler(req, res) {
  //for test
  // console.log(req.body.taskType);
  

  const query = [
    /*without constraints*/
    "",
    /*search for a certain student*/
    "",
    /*search for a certain student's attendance in a given block*/
    "",

  ];
  // if (!req.body.blockName && !req.body.groupID && !req.body.semester && !req.body.studentID) {
  //   console.log("no constraints");
  // }
  // else if (!req.body.blockName && !req.body.groupID && !req.body.semester && !req.body.studentID) {


  // }
  let sqlQuery = "SELECT blocks.block_name,blocks.group_id,timetable.* FROM blocks INNER JOIN timetable ON blocks.block_id = timetable.block_id WHERE timetable.block_id=?";

  // if (!req.body) {
  //   // Sends a HTTP bad request error code
  //   sqlQuery = query[0];
  //   console.log("no constraints");
  // }
  // else if(req.body.studentID&&!req.body.blockname){
  //   sqlQuery = query[1];
  // }
  // else if(req.body.studentID&&req.body.blockname){
  //   sqlQuery = query[2];
  // }
  // else{

  // }
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "@UniKoeln123",
    port: 3306,
    database: "test_db",
  });



  connection.connect(function (err) {
    if (err) throw err;
    connection.query(sqlQuery, [123], function (
      err,
      results,
      fields
    ) {
      if (err) throw err;
      let dataString = JSON.stringify(results);

        res.status(200).json(`${dataString}`);

    });
  });


}
