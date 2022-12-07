/*Praktika: getting general information of a singel student*/
SELECT 
blocks.block_name,blocks.block_id,blocks.group_id 
FROM blocks 
INNER JOIN mytable_fake
ON 
blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe WHERE mytable_fake.Matrikelnummer = '5558107';

/*Praktika: getting detailed info of a singel praktika of that student*/
SELECT 
blocks.block_name,blocks.group_id,timetable.*
FROM blocks
INNER JOIN timetable
ON 
blocks.block_id = timetable.block_id WHERE blocks.block_id = '0123';


SELECT 
blocks.block_name,blocks.group_id,blocks.date_start,blocks.date_end,attendance.*,timetable.sess_id,timetable.sess_type,timetable.sess_time
FROM blocks
INNER JOIN attendance
ON blocks.block_id = attendance.block_id AND attendance.student_username = 'mmuster'
LEFT JOIN timetable
ON timetable.block_id = blocks.block_id AND timetable.sess_time = attendance.confirmed_at
INNER JOIN mytable_fake
ON 
blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe AND mytable_fake.Matrikelnummer = '5558107';