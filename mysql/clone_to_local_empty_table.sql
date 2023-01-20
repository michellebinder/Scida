DROP DATABASE test_db;
CREATE DATABASE test_db;
USE test_db;

/*create table: mytable*/
CREATE TABLE csv(
   lfdNr          INTEGER  NOT NULL
  ,Block_name    VARCHAR(50) NOT NULL
  ,Gruppe         INTEGER NOT NULL
  ,Platz          VARCHAR(50) NOT NULL
  ,Matrikelnummer INTEGER  NOT NULL 
  ,Abschlussziel  VARCHAR(50) NOT NULL
  ,SPOVersion     VARCHAR(130) NOT NULL
  ,StudienID      VARCHAR(30) NOT NULL
  ,Studium        VARCHAR(120) NOT NULL
  ,Fachsemester   INTEGER  NOT NULL
  ,Anmeldedatum   VARCHAR(25) NOT NULL
  ,Kennzahl       VARCHAR(24) NOT NULL
  ,Semester       VARCHAR(20) /* NOT NULL */
  ,PRIMARY KEY (Matrikelnummer,Block_name,Fachsemester, Semester)
);
/*create table: students, not needed anymore*/
/* CREATE TABLE students(
   matrikelnummer        INTEGER  NOT NULL,
   alias         VARCHAR(30) NOT NULL
  ,account_pwd       VARCHAR(80) NOT NULL
  ,PRIMARY KEY (matrikelnummer)
); */

/* INSERT INTO students ( matrikelnummer, alias, account_pwd ) value ('5558107','mmuster','testpwd1');
INSERT INTO students ( matrikelnummer, alias, account_pwd ) value ('7162534','eexample','testpwd2');
INSERT INTO students ( matrikelnummer, alias, account_pwd ) value ('7654321','ffake','testpwd3');

SELECT * FROM students; */
/*create table: accounts*/
CREATE TABLE accounts(
   account_id        INTEGER  NOT NULL AUTO_INCREMENT,
   first_name         VARCHAR(30) NOT NULL
  ,last_name          VARCHAR(30) NOT NULL
  ,email              VARCHAR(30) NOT NULL
  ,account_pwd       VARCHAR(80) NOT NULL
  ,account_role       VARCHAR(20) NOT NULL
  ,PRIMARY KEY (account_id)
);
INSERT INTO accounts ( first_name, last_name, email, account_pwd, account_role) value ('admin','admin','admin@admin','a85b6a20813c31a8b1b3f3618da796271c9aa293b3f809873053b21aec501087', 'scidaDekanat');/*  B for externe Dozierende */

/*create table: attendance*/
CREATE TABLE attendance(
   block_id           INTEGER  NOT NULL 
  ,group_id          INTEGER  NOT NULL
  ,sess_id            INTEGER  NOT NULL
  ,matrikelnummer   VARCHAR(30) NOT NULL
  ,lecturer_id        VARCHAR(30) NOT NULL 
  ,confirmed_at       DATE DEFAULT NULL
  ,PRIMARY KEY (matrikelnummer, block_id,sess_id, group_id)    
);

/*create table: blocks*/
CREATE TABLE blocks(
   block_name       VARCHAR(50) NOT NULL 
  ,block_id        INTEGER  NOT NULL AUTO_INCREMENT
  ,semester           VARCHAR(11) NOT NULL
  ,PRIMARY KEY (block_id)
);

/*create table: timetable*/
CREATE TABLE sessions(
   lecturer_id   VARCHAR(30) DEFAULT NULL
  ,block_id    INTEGER NOT NULL
  ,group_id    INTEGER(5) NOT NULL
  ,sess_id     INTEGER (5) NOT NULL
  ,sess_type   VARCHAR(10) DEFAULT NULL
  ,sess_start_time   DATETIME
  ,sess_end_time  DATETIME
  ,PRIMARY KEY (block_id,group_id,sess_id)
);