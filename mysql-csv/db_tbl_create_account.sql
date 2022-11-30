/*run it in mysql CLI using ' source ~/Documents/sci/scida/mysql-csv/db_tbl_create_account.sql ' or something similar, it depends on the path*7
/*we don't need this, cause test_db is existed already */
/*CREATE DATABASE test_db;*/

/*choose the database we will use*/
USE test_db;
/*delete the existed table "account" cause we need to cahnge its structure*/
DROP TABLE accounts; 
/*automatic generated id and password*/
CREATE TABLE accounts(
   account_id        INTEGER  NOT NULL AUTO_INCREMENT,
   first_name         VARCHAR(30) NOT NULL
  ,last_name          VARCHAR(30) NOT NULL
  ,email              VARCHAR(30) NOT NULL
  ,account_pwd       VARCHAR(80) NOT NULL
  ,salt               VARCHAR(50) NOT NULL
  ,account_role       VARCHAR(20) NOT NULL
  ,PRIMARY KEY (account_id)
);


/*see the structure of this table*/
SHOW COLUMNS FROM test_db.accounts;

/*not necessary, but if you want see the contents (though the table is empty rn, so it will only return "Empty set") */
SELECT * FROM test_db.accounts;