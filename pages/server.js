//import module mysql
const mysql = require("mysql");
//info
const connection = mysql.createConnection({
	host:"127.0.0.1",
	user:"root",
	port:3306,
	password:"@UniKoeln123",
	database:"test_db"

});
//connection
connection.connect( );
//operation
connection.query('select * from tutorials_tbl',(err,results,fields)=>{
	if(err) throw err;
	console.log(results);
})
//stop
connection.end();
