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
      let sqlQuery =
        "SELECT blocks.block_name,blocks.group_id,sessions.* FROM blocks INNER JOIN sessions ON blocks.block_id = sessions.block_id WHERE sessions.block_id=?";

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
        timezone: "UTC+1",
      });

      connection.connect(function(err) {
        if (err) throw err;
        connection.query(sqlQuery, [123], function(err, results, fields) {
          if (err) throw err;
          let dataString = JSON.stringify(results);

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
