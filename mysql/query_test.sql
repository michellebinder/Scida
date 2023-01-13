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

/*use confirmed time*/
/* SELECT 
blocks.block_name,blocks.group_id,blocks.date_start,blocks.date_end,attendance.*,timetable.sess_id,timetable.sess_type,timetable.sess_time
FROM blocks
INNER JOIN attendance
ON blocks.block_id = attendance.block_id AND attendance.student_username = 'mmuster'
LEFT JOIN timetable
ON timetable.block_id = blocks.block_id AND timetable.sess_time = attendance.confirmed_at
INNER JOIN mytable_fake
ON 
blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe AND mytable_fake.Matrikelnummer = '5558107'; */

/**use session id, only real attendance*/
SELECT 
blocks.block_name,blocks.group_id,blocks.date_start,blocks.date_end,attendance.*,timetable.sess_id,timetable.sess_type,timetable.sess_time
FROM blocks
INNER JOIN attendance
ON blocks.block_id = attendance.block_id AND attendance.student_username = 'mmuster'
LEFT JOIN timetable
ON timetable.block_id = blocks.block_id AND timetable.sess_id = attendance.sess_id
INNER JOIN mytable_fake
ON 
blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe AND mytable_fake.Matrikelnummer = '5558107'
/*test*/

/*use session id, include holidays*/
SELECT 
blocks.block_name,blocks.group_id,blocks.date_start,blocks.date_end,attendance.block_id/* ,count(distinct  */,timetable.sess_id/* ) AS attendance_count */
FROM blocks
INNER JOIN attendance
ON blocks.block_id = attendance.block_id AND attendance.student_username = 'mmuster'
RIGHT JOIN timetable
ON timetable.block_id = blocks.block_id AND (timetable.sess_id = attendance.sess_id OR timetable.sess_type = 'Ferien')
INNER JOIN mytable_fake
ON blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe AND mytable_fake.Matrikelnummer = '5558107'
/* GROUP BY blocks.block_name,blocks.group_id,blocks.date_start,blocks.date_end,attendance.block_id */;
/*transform times to quote*/
SELECT 
blocks.block_name,blocks.group_id,blocks.date_start,blocks.date_end,/* timetable */attendance.block_id .block_id,count(/* /* distinct */  */timetable.sess_id)*10 AS attendance_quote
FROM blocks
INNER JOIN attendance
ON blocks.block_id = attendance.block_id AND attendance.student_username = 'mmuster'
RIGHT JOIN timetable
ON timetable.block_id = blocks.block_id AND (timetable.sess_id = attendance.sess_id /* OR timetable.sess_type = 'Ferien' */)
INNER JOIN mytable_fake
ON blocks.block_name = mytable_fake.Block_name AND blocks.group_id = mytable_fake.Gruppe AND mytable_fake.Matrikelnummer = '5558107'
LEFT JOIN (SELECT COUNT(timetable.sess_id), timetable.block_id 
FROM 
timetable
WHERE timetable.sess_type != 'Ferien'
GROUP BY
timetable.block_id )
ON attendance.block_id = timetable.block_id
GROUP BY blocks.block_name,blocks.group_id,blocks.date_start,blocks.date_end,attendance.block_id;


/* SELECT COUNT(timetable.sess_id), timetable.block_id 
FROM 
timetable
WHERE timetable.sess_type != 'Ferien'
GROUP BY
timetable.block_id ； */







SELECT blocks.block_name,blocks.semester, attendance.matrikelnummer,COUNT(attendance.confirmed_at)/COUNT(attendance.sess_id)*100 AS percentage 
FROM blocks INNER JOIN attendance ON blocks.block_id = attendance.block_id 
GROUP BY blocks.block_name,blocks.semester,attendance.matrikelnummer;

SELECT blocks.block_name,blocks.semester, attendance.matrikelnummer,COUNT(attendance.confirmed_at)/COUNT(attendance.sess_id)*100 AS percentage 
FROM blocks INNER JOIN attendance ON blocks.block_id = attendance.block_id AND attendance.matrikelnummer =5558107
GROUP BY blocks.block_name,blocks.semester,attendance.matrikelnummer;

SELECT blocks.block_name,blocks.semester, attendance.matrikelnummer,COUNT(attendance.confirmed_at)/COUNT(attendance.sess_id)*100 AS percentage 
FROM blocks INNER JOIN attendance ON blocks.block_id = attendance.block_id AND attendance.group_id = 3
GROUP BY blocks.block_name,blocks.semester,attendance.matrikelnummer;

SELECT blocks.block_name,blocks.semester, attendance.matrikelnummer,COUNT(attendance.confirmed_at)/COUNT(attendance.sess_id)*100 AS percentage 
FROM blocks INNER JOIN attendance ON blocks.block_id = attendance.block_id AND attendance.matrikelnummer =5558107 AND attendance.group_id = 3
GROUP BY blocks.block_name,blocks.semester,attendance.matrikelnummer;
