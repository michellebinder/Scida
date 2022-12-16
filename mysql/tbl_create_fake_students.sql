/*should later be replaced by LDAP*/
USE test_db;
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