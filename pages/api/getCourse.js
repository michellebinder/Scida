const mysql = require("mysql");
const blockname = [];
    const groupnumber = [];
    const blockIDQuery = [];
    const blockID = [];
export default function handler(req, res) {
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
        /*select all blocks of this student (by matrikelnummer) using original mytable */
        connection.query("SELECT Gruppe FROM mytable WHERE Matrikelnummer = ?", ['5558107'], function (err, results, fields) {
            if (err) throw err;
            /* const blockname = new Array(results.length);
            const groupnumber = new Array(results.length);
            const blockIDQuery = new Array(results.length);
            const blockID = new Array(results.length); */


            /* split Block name and group number for further search */
            for (let i = 0; i < results.length; i++) {
                /* blockname[i] = results[i].Gruppe.substring(0, results[i].Gruppe.length - 10);
                groupnumber[i] = results[i].Gruppe.substring(results[i].Gruppe.length - 2); */
                blockname.push(results[i].Gruppe.substring(0, results[i].Gruppe.length - 10));
                groupnumber.push(results[i].Gruppe.substring(results[i].Gruppe.length - 2));
                blockIDQuery.push ("SELECT block_id FROM blocks WHERE block_name='" + blockname[i] + "' AND group_id =" + groupnumber[i]);
            }
            console.log(blockname + ' and ' + groupnumber);
            /* console.log(data);
            res.status(200).json(data); */
            /* res.status(200).json(blockname, groupnumber);  */
        });

        /*get all block IDs*/
        /*not working, try to send the data above to a new api to get what I need below tomorrow*/
        /*  console.log(blockname + ' and ' + groupnumber);

        console.log(blockname.length);
        for (let i = 0; i < blockname.length; i++) {
            connection.query(blockIDQuery[i], function (err, results, fields) {
                if (err) throw err;
                blockID.push = results[0].block_id;
                console.log(blockID[i]);
                res.status(200).json(blockID);

            });
            res.status(200).json(blockID);
        } */


        /*select all blocks of this student (by matrikelnummer) using fake mytable (blockname and group id seperated) */
        connection.query("SELECT alias FROM students WHERE matrikelnummer = ?", ['5558107'], function (err, results, fields) {
            if (err) throw err;
            const aliasname = results[0].alias;
            console.log(aliasname);
            /* res.status(200).json(aliasname); */

        });

        /*get correspondent username*/
       /*  connection.query("SELECT blocks.block_name,blocks.block_id,blocks.group_id FROM blocks INNER JOIN mytable_fake ON blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe AND mytable_fake.Matrikelnummer= ?", ['5558107'], function (err, results, fields) {
            if (err) throw err;
            res.status(200).json(results);
            

        }); */

        connection.query("SELECT blocks.block_name,blocks.group_id,attendance.* FROM blocks INNER JOIN attendance ON blocks.block_id = attendance.block_id AND attendance.student_username = ? INNER JOIN mytable_fake ON blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe AND mytable_fake.Matrikelnummer = ?;", ['mmuster','5558107'], function (err, results, fields) {
            if (err) throw err;
            res.status(200).json(results);
            /* res.status(200).json(aliasname); */

        });

        




    });

}
