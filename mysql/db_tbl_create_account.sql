/*run it in mysql CLI using 
'source ~/Documents/sci/scida/mysql-csv/db_tbl_create_account.sql; ' (IN VM, don't forget the ';')

or 'source ~/Documents/sci/scida/mysql-csv/db_tbl_create_account.sql', (ON MY LAPTOP) */
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

/*add a few test accounts, not necessary*/
INSERT INTO accounts ( first_name, last_name, email, account_pwd, salt, account_role) value ('admin','admin','admin@admin','testpwd', 'salt', 'Studiendekanat');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, salt, account_role) value ('admin2','admin','admin2@admin','testpwd', 'salt', 'Dozierende');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, salt, account_role) value ('admin3','admin','admin3@admin','testpwd', 'salt', 'Sekretariat');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, salt, account_role) value ('admin4','admin','admin4@admin','testpwd', 'salt', 'Dozierende');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, salt, account_role) value ('admin5','admin','admin5@admin','testpwd', 'salt', 'Dozierende');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, salt, account_role) value ('admin6','admin','admin6@admin','testpwd', 'salt', 'Dozierende');

/*not necessary, but if you want see the test accounts  */
SELECT * FROM test_db.accounts;