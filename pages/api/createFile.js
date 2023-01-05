const mysql = require("mysql2");
import { Parser } from "json2csv";
import fs from "fs";
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
    if (role === "A" || role === "B") {
      //for test
      // console.log(req.body.taskType);
      const body = req.body;
      /* const blockname = JSON.stringify(body.blockname);
      const studentID = JSON.stringify(body.studentID);
      const groupID = JSON.stringify(body.groupID);
      const semester = JSON.stringify(body.semester); */
      // console.log(typeof(req.body.blockName) == "undefined");     
      // console.log(typeof(req.body.groupID) == "undefined");
      // console.log(typeof(req.body.semester) == "undefined");
      // console.log(typeof(req.body.studentID) == "undefined");
      // console.log(req.body);
      console.log(body.blockName == "");
      console.log(body.studentID == "");

      const query = [
        "SELECT blocks.block_name,blocks.group_id, blocks.semester, attendance.matrikelnummer,COUNT(attendance.confirmed_at)/COUNT(attendance.sess_id)*100 AS percentage FROM blocks INNER JOIN attendance ON blocks.block_id = attendance.block_id ", //0
        /*1. without constraints*/
        " GROUP BY blocks.block_name,blocks.group_id,blocks.semester,attendance.matrikelnummer", //1
        /*search for a certain student*/
        "WHERE attendance.matrikelnummer=",                                              //2
        /* */
        " GROUP BY blocks.block_name,blocks.group_id,blocks.semester",                            //3
        /*search for a certain student's attendance in a given block*/
        " AND blocks.block_name LIKE ",                                                 //4
      ];
      // if (!req.body.blockName && !req.body.groupID && !req.body.semester && !req.body.studentID) {
      //   console.log("no constraints");
      // }
      // else if (!req.body.blockName && !req.body.groupID && !req.body.semester && !req.body.studentID) {

      // }
      let sqlQuery = "";


      if (body.blockName == "" && body.groupID == "" && body.semester == "") {
        // Sends a HTTP bad request error code
        if (body.studentID == "") {
          console.log("no constraints");
          sqlQuery = query[0] + query[1];
          console.log("no constraints" + sqlQuery);
        }
        else {
          /*search for a certain student*/
          console.log("for a certain student");
          sqlQuery = query[0] + query[2] + body.studentID.toString() + query[3];
          console.log("for a certain student" + sqlQuery);
        }

      }
      // /*search for a certain student*/
      
      // /*search for a certain student's attendance in a given block*/
      // else if(body.studentID&&body.blockname){
      //   sqlQuery += query[1]+body.studentID+query[3]+"'%"+body.blockname+"%'"+query[2];
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
        connection.query(sqlQuery, function (err, results, fields) {
          if (err) throw err;
          let dataString = JSON.stringify(results);
          console.log(results);

          res.status(200).json(`${dataString}`);
        });
      });
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
