/*run it in mysql CLI using 
'source ~/Documents/sci/scida/mysql-csv/db_tbl_create_attendance.sql; ' (IN VM, don't forget the ';')

or 'source ~/Documents/sci/scida/mysql-csv/db_tbl_create_attendance.sql;', (ON MY LAPTOP) */

/*we don't need this, cause test_db is existed already */
/*CREATE DATABASE test_db;*/

/*choose the database we will use*/
USE test_db;
/*delete the existed table "account" cause we need to cahnge its structure, don't need it if we don't have such a table*/
DROP TABLE attendance; 
/*I choose username and date of attendance cause a student cannot attand the same session twice or more, and we should avoid that*/
/* CREATE TABLE attendance(
   block_id           INTEGER  NOT NULL 
  ,student_username   VARCHAR(30) NOT NULL
  ,lecturer_id        VARCHAR(30) NOT NULL
  ,confirmed_at       DATE
  ,PRIMARY KEY (student_username, confirmed_at)    
); */

/*
another structure (test)
*/

CREATE TABLE attendance(
   block_id           INTEGER  NOT NULL 
  ,sess_id            INTEGER  NOT NULL
  ,student_username   VARCHAR(30) NOT NULL
  ,lecturer_id        VARCHAR(30) NOT NULL  /*is it better to be replaced by confirmed_by? */
  ,confirmed_at       DATE
  ,PRIMARY KEY (student_username, confirmed_at)    
);

/*see the structure of this table*/
SHOW COLUMNS FROM test_db.attendance;

/*not necessary, but if you want see the contents (though the table is empty rn, so it will only return "Empty set") */
SELECT * FROM test_db.attendance;



