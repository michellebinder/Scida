/* CREATE DATABASE test_db; */
USE test_db;
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
  ,PRIMARY KEY (Matrikelnummer,Block_name,Fachsemester)/*one cannot be in two groups of a blockpraktika in one semesterFachsemester*/
);
