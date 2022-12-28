CREATE DATABASE test_db;
USE test_db;

/*create table: mytable*/
CREATE TABLE mytable(
   lfdNr          INTEGER  NOT NULL
  ,Block_name    VARCHAR(50) NOT NULL
  ,Gruppe         VARCHAR(33) NOT NULL
  ,Platz          VARCHAR(50) NOT NULL
  ,Matrikelnummer INTEGER  NOT NULL 
  ,Abschlussziel  VARCHAR(12) NOT NULL
  ,SPOVersion     VARCHAR(80) NOT NULL
  ,StudienID      VARCHAR(13) NOT NULL
  ,Studium        VARCHAR(60) NOT NULL
  ,Fachsemester   INTEGER  NOT NULL
  ,Anmeldedatum   VARCHAR(16) NOT NULL
  ,Kennzahl       VARCHAR(11) NOT NULL
  ,PRIMARY KEY (Matrikelnummer,Block_name,Fachsemester)
);
/*create table: students*/
CREATE TABLE students(
   matrikelnummer        INTEGER  NOT NULL,
   alias         VARCHAR(30) NOT NULL
  ,account_pwd       VARCHAR(80) NOT NULL
  ,PRIMARY KEY (matrikelnummer)
);

INSERT INTO students ( matrikelnummer, alias, account_pwd ) value ('5558107','mmuster','testpwd1');
INSERT INTO students ( matrikelnummer, alias, account_pwd ) value ('7162534','eexample','testpwd2');
INSERT INTO students ( matrikelnummer, alias, account_pwd ) value ('7654321','ffake','testpwd3');

SELECT * FROM students;
/*create table: accounts*/
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

INSERT INTO accounts ( first_name, last_name, email, account_pwd, salt, account_role) value ('admin','admin','admin@admin','testpwd', 'salt', 'Studiendekanat');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, salt, account_role) value ('admin2','admin','admin2@admin','testpwd', 'salt', 'Dozierende');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, salt, account_role) value ('admin3','admin','admin3@admin','testpwd', 'salt', 'Sekretariat');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, salt, account_role) value ('admin4','admin','admin4@admin','testpwd', 'salt', 'Dozierende');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, salt, account_role) value ('admin5','admin','admin5@admin','testpwd', 'salt', 'Dozierende');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, salt, account_role) value ('admin6','admin','admin6@admin','testpwd', 'salt', 'Dozierende');

/*create table: attendance*/
CREATE TABLE attendance(
   block_id           INTEGER  NOT NULL 
  ,sess_id            INTEGER  NOT NULL
  ,student_username   VARCHAR(30) NOT NULL
  ,lecturer_id        VARCHAR(30) NOT NULL 
  ,confirmed_at       DATE
  ,PRIMARY KEY (student_username, block_id,sess_id)    
);
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0123','01','mmuster','admin2@admin','2022-10-10');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0123','02','mmuster','admin2@admin','2022-10-10');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0123','03','mmuster','admin2@admin','2022-10-11');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0526','01','mmuster','admin4@admin','2022-10-24');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('1234','01','mmuster','admin5@admin','2022-10-17');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0526','03','mmuster','admin4@admin','2022-10-26');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('4567','01','mmuster','admin6@admin','2022-11-01');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0123','01','eexample','admin2@admin','2022-10-10');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0123','02','eexample','admin2@admin','2022-10-11');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0526','01','eexample','admin4@admin','2022-10-24');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('1234','01','eexample','admin5@admin','2022-10-17');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0526','03','eexample','admin4@admin','2022-10-26');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('4567','01','eexample','admin6@admin','2022-11-01');

/*create table: blocks*/
CREATE TABLE blocks(
  block_name       VARCHAR(50) NOT NULL 
  ,block_id        INTEGER  NOT NULL AUTO_INCREMENT
  ,group_id           VARCHAR(30) NOT NULL
  ,lecturer_id        VARCHAR(30) NOT NULL
  ,date_start          DATE
  ,date_end              DATE
  ,PRIMARY KEY (block_id, lecturer_id)
);
INSERT INTO blocks (block_name,block_id,group_id,lecturer_id,date_start,date_end) value ('Gynäkologie','0123','03','admin2@admin','2022-10-10','2022-10-14');
INSERT INTO blocks (block_name,block_id,group_id,lecturer_id,date_start,date_end) value ('Chirurgie','0526','09','admin4@admin','2022-10-24','2022-10-28');
INSERT INTO blocks (block_name,block_id,group_id,lecturer_id,date_start,date_end) value ('Innere Medizin','1234','08','admin5@admin','2022-10-17','2022-10-21');
INSERT INTO blocks (block_name,block_id,group_id,lecturer_id,date_start,date_end) value ('Pädiatrie','4567','07','admin6@admin','2022-11-01','2022-11-05');

/*create table: timetable*/
CREATE TABLE timetable(
   block_id    INTEGER(10) NOT NULL
  ,sess_id     INTEGER (5) NOT NULL
  ,sess_type   VARCHAR(10) NOT NULL
  ,sess_time   DATE
  ,PRIMARY KEY (block_id, sess_id)
);
/*Gynäkologie 03*/
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','1','Praktikum','2022-10-10');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','2','Seminar','2022-10-10');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','3','Praktikum','2022-10-11');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','4','Seminar','2022-10-11');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','5','Praktikum','2022-10-12');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','6','Seminar','2022-10-12');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','7','Praktikum','2022-10-13');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','8','Seminar','2022-10-13');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','9','Ferien','2022-10-14');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','10','Ferien','2022-10-14');

/*Chirurgie 09*/
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0526','1','Seminar','2022-10-24');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0526','2','Praktikum','2022-10-25');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0526','3','Praktikum','2022-10-26');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0526','4','Praktikum','2022-10-27');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0526','5','Praktikum','2022-10-28');
/*Innere Medizin 08*/
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('1234','1','Seminar','2022-10-17');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('1234','2','Praktikum','2022-10-18');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('1234','3','Praktikum','2022-10-19');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('1234','4','Praktikum','2022-10-20');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('1234','5','Praktikum','2022-10-21');
/*Pädiatrie 07*/
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('4567','1','Seminar','2022-11-01');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('4567','2','Praktikum','2022-11-02');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('4567','3','Praktikum','2022-11-03');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('4567','4','Praktikum','2022-11-04');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('4567','5','Praktikum','2022-11-05');  