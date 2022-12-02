/*run it in mysql CLI using 
'source ~/Documents/sci/scida/mysql-csv/db_tbl_create_block.sql; ' (IN VM, don't forget the ';')

or 'source ~/Documents/sci/scida/mysql-csv/db_tbl_create_block.sql;', (ON MY LAPTOP) */

/*we don't need this, cause test_db is existed already */
/*CREATE DATABASE test_db;*/

/*choose the database we will use*/
USE test_db;
/*delete the existed table "account" cause we need to change its structure*/
DROP TABLE blocks; 
/*automatic generated id and password*/
CREATE TABLE blocks(
  block_name       VARCHAR(50) NOT NULL 
  ,block_id        INTEGER  NOT NULL AUTO_INCREMENT
  ,group_id           VARCHAR(30) NOT NULL
  ,lecturer_id        VARCHAR(30) NOT NULL
  ,date_start          DATE
  ,date_end              DATE
  ,PRIMARY KEY (block_id, lecturer_id)
);


/*see the structure of this table*/
SHOW COLUMNS FROM test_db.blocks;

/*not necessary, but if you want see the contents (though the table is empty rn, so it will only return "Empty set") */
SELECT * FROM test_db.blocks;