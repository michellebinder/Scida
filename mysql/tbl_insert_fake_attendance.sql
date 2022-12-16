USE test_db;
/*without session id*/
/* INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('0123','mmuster','admin2@admin','2022-10-10');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('0123','mmuster','admin2@admin','2022-10-10');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('0123','mmuster','admin2@admin','2022-10-11');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('0526','mmuster','admin4@admin','2022-10-24');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('1234','mmuster','admin5@admin','2022-10-17');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('0526','mmuster','admin4@admin','2022-10-26');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('4567','mmuster','admin6@admin','2022-11-01');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('0123','eexample','admin2@admin','2022-10-10');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('0123','eexample','admin2@admin','2022-10-11');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('0526','eexample','admin4@admin','2022-10-24');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('1234','eexample','admin5@admin','2022-10-17');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('0526','eexample','admin4@admin','2022-10-26');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('4567','eexample','admin6@admin','2022-11-01'); */

/*with session id*/
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0123','01','mmuster','admin2@admin','2022-10-10');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0123','02','mmuster','admin2@admin','2022-10-10');
INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0123','03','mmuster','admin2@admin','2022-10-11');
/* INSERT INTO attendance (block_id,sess_id,student_username,lecturer_id,confirmed_at) value ('0123','04','mmuster','admin2@admin','2022-10-13'); */
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


/* INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('Kinderheilkunde Gruppe 03','mmuster','admin2@admin','2022-11-28');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('Kinderheilkunde Gruppe 03','mmuster','admin2@admin','2022-11-27');
INSERT INTO attendance (block_id,student_username,lecturer_id,confirmed_at) value ('Kinderheilkunde Gruppe 03','mmuster','admin2@admin','2022-11-26'); */


