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
    if (role === "scidaDekanat" || role === "scidaSekretariat") {
      //for test
      const body = req.body;
      //components of queries
      const query = [
        "SELECT blocks.block_name,/* blocks.group_id, */ blocks.semester, attendance.matrikelnummer,COUNT(attendance.confirmed_at)/COUNT(attendance.sess_id)*100 AS percentage FROM blocks INNER JOIN attendance ON blocks.block_id = attendance.block_id ", //0              
        /*search for a certain block*/
        " AND blocks.block_name LIKE ",                                                 //1
        /*search for a certain group id*/
        " AND attendance.group_id=",                                                    //2
        /*search for a certain semester*/
        " AND blocks.semester=",                                                        //3
        /*search for a certain student*/
        " AND attendance.matrikelnummer=",                                              //4  
        /*1. without constraints*/
        " GROUP BY blocks.block_name,/* blocks.group_id, */blocks.semester,attendance.matrikelnummer",     //5
        // /* */
        // " GROUP BY blocks.block_name,/* blocks.group_id, */blocks.semester",                            //6

      ];
      let sqlQuery = "";
      if (body.blockName == ""){
        if (body.groupID == ""){
          if (body.semester == ""){
            if (body.studentID == ""){
              //limits: no
              sqlQuery = query[0] + query[5];    
              console.log("limits: no");    
            }
            else{
              //limits: Matrikelnummer
              sqlQuery = query[0] + query[4] + body.studentID.toString() + query[5];
              console.log("limits: Matrikelnummer");
            }       
          }
          else{
            if (body.studentID == ""){
              //limits: semester
             
              sqlQuery = query[0] + query[3] + "'"+body.semester+"'" + query[5];  
              console.log("limits: semester");      
            }
            else{
              //limits: semester + Matrikelnummer
              
              sqlQuery = query[0] + query[3] + "'"+body.semester+"'" + query[4] + body.studentID.toString() + query[5];
              console.log("limits: semester + Matrikelnummer");
            }    
          }       
        }
        else{
          if (body.semester == ""){
            if (body.studentID == ""){
              //limits: group
              sqlQuery = query[0] + query[2] + "'"+body.groupID+"'" + query[5];  
              console.log("limits: group");      
            }
            else{
              //limits: group + Matrikelnummer
              sqlQuery = query[0] + query[2] + "'"+body.groupID+"'" + query[4] + body.studentID.toString() + query[5];
              console.log("limits: group + Matrikelnummer");
            }       
          }
          else{
            if (body.studentID == ""){
              //limits: group + semester           
              sqlQuery = query[0] + query[2] + "'"+body.groupID+"'" + query[3] + "'"+body.semester +"'" + query[5];      
              console.log("limits: group + semester");  
            }
            else{
              //limits: group + semester + Matrikelnummer              
              sqlQuery = query[0] + query[2] + "'"+body.groupID+"'" + query[3] + "'"+body.semester +"'" + query[4] + body.studentID.toString() + query[5]; 
              console.log("limits: group + semester + Matrikelnummer");
            }    
          }    
        }
      }
      else{
        if (body.groupID == ""){
          if (body.semester == ""){
            if (body.studentID == ""){
              //limits: praktika
              sqlQuery = query[0] + query[1] + "'%"+body.blockName+"%'" + query[5];  
              // console.log(sqlQuery); 
              console.log("limits: praktika");      
            }
            else{
              //limits: praktika + Matrikelnummer
              sqlQuery = query[0] + query[1] + "'%"+body.blockName+"%'" + query[4] + body.studentID.toString() + query[5];
              console.log("limits: praktika + Matrikelnummer");
            }       
          }
          else{
            if (body.studentID == ""){
              //limits: praktika + semester
              //TODO: query
              sqlQuery = query[0] + query[1] + "'%"+body.blockName+"%'" + query[3] + "'"+body.semester +"'" + query[5];   
              console.log("limits: praktika + semester");      
            }
            else{
              //limits: praktika + semester + Matrikelnummer
              //TODO: query
              sqlQuery = query[0] + query[1] + "'%"+body.blockName+"%'" + query[3] + "'"+body.semester +"'" + query[4] + body.studentID.toString() + query[5];
              console.log("limits: praktika + semester + Matrikelnummer");
            }    
          }       
        }
        else{
          if (body.semester == ""){
            if (body.studentID == ""){
              //limits: praktika + group
              sqlQuery = query[0] + query[1] + "'%"+body.blockName+"%'" + query[2] + "'" +body.groupID+"'" + query[5];   
              console.log("limits: praktika + group");      
            }
            else{
              //limits: praktika + group + Matrikelnummer
              sqlQuery = query[0] + query[1] + "'%"+body.blockName+"%'" + query[2] + "'" +body.groupID+"'" + query[4] + body.studentID.toString() + query[5];
              console.log("limits: praktika + group + Matrikelnummer");
            }       
          }
          else{
            if (body.studentID == ""){
              //limits: praktika + group + semester
              //TODO: query
              sqlQuery = query[0] + query[1] + "'%"+body.blockName+"%'" + query[2] + "'" +body.groupID+"'" + query[3] + "'"+body.semester +"'" + query[5]; 
              console.log("limits: praktika + group + semester");       
            }
            else{
              //limits: praktika group + semester +Matrikelnummer
              //TODO: query
              sqlQuery = query[0] + query[1] + "'%"+body.blockName+"%'" + query[2] + "'" +body.groupID+"'" + query[3] + "'"+body.semester +"'" + query[4] + body.studentID.toString() + query[5];
              console.log("limits: praktika group + semester +Matrikelnummer");
            }    
          }    
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
