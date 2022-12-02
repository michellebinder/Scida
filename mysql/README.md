# A Simple Guide
### ( if you are interested in Backend stuff )
* some of my notes on this part (Backend and Database basiclly)
[notes](https://github.com/jyi2333/public-notes)
If confusing or find any errors, tell me in Discord or WhatsApp  :)

---
## 1. How to use the Database in our VM ( if you are interested in Backend stuff )

### 1.1. How to check our database (and contents, of course)
* only Command herethen
* MySQL Queries are case-insensitive
1. MySQL Server login , `mysql -u root -p`, Pwd: just @UniKoeln123, now you are in MySQL Command Line, looks like `MySQL>`
2. `exit`: to quit MySQL Command Line
   
   common queries
   * `CREATE DATABASE db_name;`: create a new database
   * `SHOW DATABASES;`: list all databases in your MySQL Server
   * `USE database_name;`: choose a certain database
   * `SHOW TABLES;`: list all tablees in the database that you chose
   * `CREATE TABLE new_table_name();`:create a blank table
   * `SELECT * FROM db_name.table_name;`: display contents in table `table_name`
   * `SELECT Gruppe FROM test_db.mytable WHERE Matrikelnummer = 12345;`: display the `Group` of a student whose Matrikelnummer is `12345`
### 1.2 Remote Connection to MySQL Server of our VM
* soon...I guess? I need to first figure out how to connect the DB in our VM remotely myself
  
## 2. If you want to try it yourself
* Tests with test_db will always be open till...idk
### 2.1 CSV Import in VM
#### 2.1.1 drop the existed table
otherwise it would definitely return error message (import the same database repeatly into the same table would cause problem with primary key)
* login MySQL, 
* `USE test_db;` ,
* then `DROP TABLE mytable;`
#### 2.1.2 create a empty table and import the file again
1. create `mytable` again, empty though *see command in `script.txt`, (of course you could test it with the command for display, see above)
2. quit MySQL or open a new Terminal, run `node /.../.../scida/mysql-csv/server.js` in directory `mysql-csv`, if you are not familiar with directory structure or linux commands, just right-click in `mysql-csv` and `Open in Terminal`, then run `node server.js`

3. now login MySQL & choose test_db again if you quitted it in step 3, then display `mytable` and see if the csv. file is successfully imported.

### 2.2 CSV import in your Computer
#### 2.2.1 install MySQL Server
* since I'm not a Mac user, can't give you guys any advice.
#### 2.2.2 Configuration
* what's important is to set the password for root-user to `@UniKoeln123`;
* Of course other password are ok, but the you need to change the `server.js` file, and if you did use other password, pls don't push your changes in this file.

#### 2.2.2 create DB and Table in MySQL
* I will try to write a SQL script or something later to make it easier...not familiar with that...if I have time to do so...
* but now ... everything manually :( sorry for that
  

login then:
1. create the `test_db` , command see above.
2. create the `mytable`, command see `script.txt`
* update: 
or use `db_tbl_create.sql` to get exact effect,(please make sure that there is no database called `test_db` in your DB, if it does exist, use `db_tbl_drop_create.sql`)
* >MySQL> source ~/.../scida/mysql-csv/db_tbl_create.sql
* It depends on your computer
#### 2.2.3. Environment Configuration
*I've updated the `package.json` file in branch  `database`, so simply run `npm install` , it should get you all modules needed for the whole project.
If not, run `npm install mysql` and`npm install fast-csv`

#### 2.2.4 Import :)
simply run `node server.js`, then check your table, details see 2.1.2