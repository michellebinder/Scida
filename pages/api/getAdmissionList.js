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
    let studentID;

    try {
      //Try ldap, if not existent do catch with local accounts
      role = session.user.attributes.UniColognePersonStatus;
    } catch {
      role = session.user.account_role;
    }

    //Check if users role is allowed to contact api, here role A (Admin i.e. Dekanat) and B (Beschäftigte i.e Sekretariat) is allowed
    if (
      role === "scidaDekanat" ||
      role === "scidaSekretariat" ||
      role === "S"
    ) {
      //for test
      const body = req.body;
      //get Matrikelnummer of the user
      if (role === "S") {
        studentID = session.user.attributes.description.slice(1);
      } else {
        studentID = body.studentID;
      }
      //components of queries
      const query = [
        "SELECT blocks.block_name, blocks.semester, attendance.matrikelnummer,attendance.confirmed_at,attendance.sess_id FROM blocks INNER JOIN attendance ON blocks.block_id = attendance.block_id ", //0
        /*search for a certain block*/
        " AND blocks.block_name LIKE ", //1
        /*search for a certain group id*/
        " AND attendance.group_id=", //2
        /*search for a certain semester*/
        " AND blocks.semester=", //3
        /*search for a certain student*/
        " AND attendance.matrikelnummer=", //4
        /*1. without constraints*/
        " /*GROUP BY attendance.matrikelnummer,blocks.block_name, blocks.group_id, blocks.semester*/", //5
      ];
      let sqlQuery = "";
      if (body.blockName == "") {
        if (studentID == "") {
          //limits: no
          sqlQuery = query[0] + query[5];
        } else {
          //limits: Matrikelnummer
          sqlQuery = query[0] + query[4] + studentID.toString() + query[5];
        }
      } else {
        if (studentID == "") {
          //limits: praktika
          sqlQuery =
            query[0] + query[1] + "'%" + body.blockName + "%'" + query[5];
        } else {
          //limits: praktika + Matrikelnummer
          sqlQuery =
            query[0] +
            query[1] +
            "'%" +
            body.blockName +
            "%'" +
            query[4] +
            studentID.toString() +
            query[5];
        }
      }

      const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "@UniKoeln123",
        port: 3306,
        database: "test_db",
        timezone: "+00:00", //Use same timezone as in mysql database
      });

      connection.connect(function(err) {
        if (err) {
          res.status(500).json("ERROR");
        } else {
          connection.query(sqlQuery, function(err, results, fields) {
            if (err) {
              res.status(500).json("ERROR");
            } else {
              const distinctStudents = Array.from(
                new Set(results.map((item) => item.matrikelnummer))
              );
              let result = [];
              let attendance = 0;
              for (let i = 0; i < distinctStudents.length; i++) {
                const studentData = results.filter(
                  (item) => item.matrikelnummer === distinctStudents[i]
                );
                const blocks = Array.from(
                  new Set(studentData.map((item) => item.block_name))
                );
                for (let j = 0; j < blocks.length; j++) {
                  const blocksData = studentData.filter(
                    (item) => item.block_name === blocks[j]
                  );
                  const distinctSemesters = Array.from(
                    new Set(blocksData.map((item) => item.semester))
                  );
                  const firstSemester = blocksData.filter(
                    (item) => item.semester === distinctSemesters[0]
                  );
                  attendance = 0;
                  blocksData.map((row) => {
                    if (row.confirmed_at) {
                      attendance += 1;
                    }
                  });
                  attendance = (attendance / firstSemester.length) * 100;
                  //detect results with percentage <80%
                  if (attendance >= 80) {
                    //detect results not in searched semester
                    if (
                      body.semester == "" ||
                      body.semester == distinctSemesters[0]
                    ) {
                      result = [
                        ...result,
                        {
                          block_name: blocks[j],
                          semester: distinctSemesters[0],
                          matrikelnummer: distinctStudents[i],
                          percentage: attendance,
                        },
                      ];
                    }
                  }
                }
              }
              let dataString = JSON.stringify(result);
              res.status(200).json(`${dataString}`);
            }
          });
        }
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
