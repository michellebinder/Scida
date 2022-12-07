const mysql = require("mysql");

const sqlQuery = ("SELECT blocks.block_name,blocks.group_id,blocks.date_start,blocks.date_end,attendance.* FROM blocks INNER JOIN attendance ON blocks.block_id = attendance.block_id AND attendance.student_username = ? INNER JOIN mytable_fake ON blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe AND mytable_fake.Matrikelnummer = ?;")

export default function handler(req, res) {

    if (!req.body) {
        // Sends a HTTP bad request error code
        console.log("Something wrong");
        return res.status(400).json({ data: "Something wrong" });
      }
      
    /*weird but works */

    const usr= req.body.stud.stud_username;
    const matri= req.body.stud.stud_matrikel;
    
    const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "@UniKoeln123",
        port: 3306,
        database: "test_db",
    });
    /* const blockname = [];
    const groupnumber = [];
    const blockIDQuery = [];
    const blockID = []; */

    connection.connect(function (err) {
        if (err) throw err;
        connection.query(sqlQuery, ["mmuster","5558107"/* usr, matri */], function (err, results, fields) {
            if (err) throw err;
            
           /*  res.status(200).json(results); */
            /* res.status(200).json(`datareceived`); */


            console.log(results.length);
            const data = [];
            for(let i = 0; i<results.length; i++){
                data.push(results[i]);
            }
            console.log(data);


        });

    });
    

}
