USE test_db;
INSERT INTO blocks (block_name,block_id,group_id,lecturer_id,date_start,date_end) value ('Gynäkologie','0123','03','admin2@admin','2022-10-10','2022-10-14');
INSERT INTO blocks (block_name,block_id,group_id,lecturer_id,date_start,date_end) value ('Chirurgie','0526','09','admin4@admin','2022-10-24','2022-10-28');
INSERT INTO blocks (block_name,block_id,group_id,lecturer_id,date_start,date_end) value ('Innere Medizin','1234','08','admin5@admin','2022-10-17','2022-10-21');
INSERT INTO blocks (block_name,block_id,group_id,lecturer_id,date_start,date_end) value ('Pädiatrie','4567','07','admin6@admin','2022-11-01','2022-11-05');

SELECT 
blocks.block_name,blocks.block_id,blocks.group_id 
FROM blocks 
INNER JOIN mytable_fake
ON 
blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe WHERE mytable_fake.Matrikelnummer = '5558107';



SELECT 
blocks.block_name,blocks.group_id,attendance.*
FROM blocks
INNER JOIN attendance
ON blocks.block_id = attendance.block_id AND attendance.student_username = 'mmuster'
INNER JOIN mytable_fake
ON 
blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe AND mytable_fake.Matrikelnummer = '5558107';
