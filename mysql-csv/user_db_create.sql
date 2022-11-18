CREATE DATABASE test_user;
USE test_user;
CREATE TABLE test_lecturer(
   tch_id         VARCHAR(30)  NOT NULL PRIMARY KEY 
  ,tch_pwd        VARCHAR(30) NOT NULL 
);

INSERT INTO test_lecturer (tch_id, tch_pwd) VALUES ('lec1','16589');
INSERT INTO test_lecturer (tch_id, tch_pwd) VALUES ('lec2','5869aabb');
INSERT INTO test_lecturer (tch_id, tch_pwd) VALUES ('lec6','aabbcc');
SELECT * FROM test_lecturer;

