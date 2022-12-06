USE test_db;
CREATE TABLE timetable(
   block_id    INTEGER(10) NOT NULL
  ,sess_id     INTEGER (5) NOT NULL
  ,sess_type   VARCHAR(10) NOT NULL
  ,sess_time   DATE
  ,PRIMARY KEY (block_id, sess_id)
);
/*Gynäkologie 03*/
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','1','Seminar','2022-10-10');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','2','Praktikum','2022-10-11');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','3','Praktikum','2022-10-12');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','4','Praktikum','2022-10-13');
INSERT INTO timetable (block_id,sess_id,sess_type,sess_time) value ('0123','5','Praktikum','2022-10-14');
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