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
    const sqlQuery = "SELECT blocks.block_name,blocks.group_id,timetable.* FROM blocks INNER JOIN timetable ON blocks.block_id = timetable.block_id WHERE blocks.block_id = ?";

    connection.connect(function (err) {
        if (err) throw err;
        connection.query(sqlQuery, ['0123'], function (err, results, fields) {
            if (err) throw err;
            let dataString = JSON.stringify(results);
            let data = JSON.parse(dataString);
            console.log(data);
            /* res.status(200).json(data); */
            res.status(200).json(`${data}`);

        });

    });

}