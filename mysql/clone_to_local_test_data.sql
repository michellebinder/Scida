DROP DATABASE test_db;
CREATE DATABASE test_db;
USE test_db;

/*create table: mytable*/
CREATE TABLE csv(
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
  ,Kennzahl       VARCHAR(20) NOT NULL
  ,Semester       VARCHAR(11) /* NOT NULL */
  ,PRIMARY KEY (Matrikelnummer,Block_name,Fachsemester, Semester)
);
/* Student 7162534*/
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '05','fix','7162534','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '01','fix','7162534','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Pädiatrie','04','fix','7162534','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Pädiatrie','07','fix','7162534','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Gynäkologie','04','fix','7162534','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Gynäkologie','09','fix','7162534','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Innere Medizin', '12','fix','7162534','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Innere Medizin', '14','fix','7162534','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

/* Student 7381103*/
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '01','fix','7381103','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '02','fix','7381103','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '03','fix','7381103','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '05','fix','7381103','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Pädiatrie','04','fix','7381103','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Pädiatrie','07','fix','71381103','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Gynäkologie','04','fix','7381103','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
/*INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Gynäkologie','09','fix','7381103','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');
*/
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Innere Medizin', '12','fix','7381103','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
/*INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Innere Medizin', '14','fix','7381103','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');*/

/* Student 1234567*/
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '01','fix','1234567','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '05','fix','1234567','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Pädiatrie','04','fix','1234567','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Pädiatrie','07','fix','1234567','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Gynäkologie','04','fix','1234567','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Gynäkologie','09','fix','1234567','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Innere Medizin', '12','fix','1234567','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Innere Medizin', '14','fix','1234567','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

/* Student 7382509*/
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '02','fix','7382509','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '06','fix','7382509','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Pädiatrie','05','fix','7382509','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Pädiatrie','010','fix','7382509','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Gynäkologie','04','fix','7382509','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Gynäkologie','09','fix','7382509','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Innere Medizin', '12','fix','7382509','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Innere Medizin', '14','fix','7382509','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

/* Student 7387340*/
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '01','fix','7387340','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '05','fix','7387340','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Pädiatrie','04','fix','7387340','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Pädiatrie','07','fix','7387340','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Gynäkologie','04','fix','7387340','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Gynäkologie','09','fix','7387340','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Innere Medizin', '12','fix','7387340','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Innere Medizin', '14','fix','7387340','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

/* Student 7383442*/
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '01','fix','7383442','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester) value ('9','Chirurgie', '05','fix','7383442','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Pädiatrie','04','fix','7383442','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Pädiatrie','07','fix','7383442','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Gynäkologie','04','fix','7383442','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Gynäkologie','09','fix','7383442','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Innere Medizin', '12','fix','7383442','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2022');
INSERT INTO csv (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl,Semester ) value ('9','Innere Medizin', '14','fix','7383442','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Prüfung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13','SoSe2023');

/*create table: blocks*/
CREATE TABLE blocks(
   block_name       VARCHAR(50) NOT NULL 
  ,block_id        INTEGER  NOT NULL AUTO_INCREMENT
  ,semester           VARCHAR(11) NOT NULL
  ,PRIMARY KEY (block_id)
);

INSERT INTO blocks (block_name,block_id,semester) value ('Chirurgie','1','SoSe2022');
INSERT INTO blocks (block_name,block_id,semester) value ('Chirurgie','2','SoSe2023');
INSERT INTO blocks (block_name,block_id,semester) value ('Pädiatrie','4','SoSe2022');
INSERT INTO blocks (block_name,block_id,semester) value ('Pädiatrie','5','SoSe2023');
INSERT INTO blocks (block_name,block_id,semester) value ('Gynäkologie','7','SoSe2022');
INSERT INTO blocks (block_name,block_id,semester) value ('Gynäkologie','8','SoSe2023');
INSERT INTO blocks (block_name,block_id,semester) value ('Innere Medizin','10','SoSe2022');
INSERT INTO blocks (block_name,block_id,semester) value ('Innere Medizin','11','SoSe2023');


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
/*Chirurgie 2022*/
/* Gruppe 1 */
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','1','1','Seminar','2022-10-24 09:00:00','2022-10-24 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','1','2','Praktikum','2022-10-25 09:00:00','2022-10-25 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','1','3','Praktikum','2022-10-1 09:00:00','2022-10-1 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','1','4','Seminar','2022-10-27 09:00:00','2022-10-27 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','1','5','Praktikum','2022-10-28 09:00:00','2022-10-28 12:00:00');
/* Gruppe 2 */
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','2','1','Seminar','2022-10-24 09:00:00','2022-10-24 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','2','2','Praktikum','2022-10-25 09:00:00','2022-10-25 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','2','3','Praktikum','2022-10-1 09:00:00','2022-10-1 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','2','4','Seminar','2022-10-27 09:00:00','2022-10-27 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','2','5','Praktikum','2022-10-28 09:00:00','2022-10-28 12:00:00');
/* Gruppe 3*/
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','3','1','Seminar','2022-10-24 09:00:00','2022-10-24 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','3','2','Praktikum','2022-10-25 09:00:00','2022-10-25 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','3','3','Praktikum','2022-10-1 09:00:00','2022-10-1 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','3','4','Seminar','2022-10-27 09:00:00','2022-10-27 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','1','3','5','Praktikum','2022-10-28 09:00:00','2022-10-28 12:00:00');
/*Chirurgie 2023*/
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','2','5','1','Seminar','2022-10-24 09:00:00','2022-10-24 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','2','5','2','Praktikum','2022-10-25 09:00:00','2022-10-25 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','2','5','3','Praktikum','2022-10-1 09:00:00','2022-10-1 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','2','5','4','Seminar','2022-10-27 09:00:00','2022-10-27 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','2','5','5','Praktikum','2022-10-28 09:00:00','2022-10-28 12:00:00');


/*Pädiatrie 2022*/
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','4','4','1','Seminar','2022-10-24 09:00:00','2022-10-24 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','4','4','2','Praktikum','2022-10-25 09:00:00','2022-10-25 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','4','4','3','Praktikum','2022-10-1 09:00:00','2022-10-1 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','4','4','4','Seminar','2022-10-27 09:00:00','2022-10-27 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','4','4','5','Praktikum','2022-10-28 09:00:00','2022-10-28 12:00:00');
/*Pädiatrie 2023*/
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','5','7','1','Seminar','2022-10-24 09:00:00','2022-10-24 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','5','7','2','Praktikum','2022-10-25 09:00:00','2022-10-25 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','5','7','3','Praktikum','2022-10-1 09:00:00','2022-10-1 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','5','7','4','Seminar','2022-10-27 09:00:00','2022-10-27 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','5','7','5','Praktikum','2022-10-28 09:00:00','2022-10-28 12:00:00');

/*Gynäkologie 2022*/
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','7','4','1','Seminar','2022-10-24 09:00:00','2022-10-24 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','7','4','2','Praktikum','2022-10-25 09:00:00','2022-10-25 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','7','4','3','Praktikum','2022-10-1 09:00:00','2022-10-1 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','7','4','4','Seminar','2022-10-27 09:00:00','2022-10-27 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','7','4','5','Praktikum','2022-10-28 09:00:00','2022-10-28 12:00:00');
/*Gynäkologie 2023*/
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','8','9','1','Seminar','2022-10-24 09:00:00','2022-10-24 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','8','9','2','Praktikum','2022-10-25 09:00:00','2022-10-25 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','8','9','3','Praktikum','2022-10-1 09:00:00','2022-10-1 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','8','9','4','Seminar','2022-10-27 09:00:00','2022-10-27 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','8','9','5','Praktikum','2022-10-28 09:00:00','2022-10-28 12:00:00');

/*Innere Medizin 2022*/
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','10','12','1','Seminar','2022-10-24 09:00:00','2022-10-24 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','10','12','2','Praktikum','2022-10-25 09:00:00','2022-10-25 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','10','12','3','Praktikum','2022-10-1 09:00:00','2022-10-1 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','10','12','4','Seminar','2022-10-27 09:00:00','2022-10-27 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','10','12','5','Praktikum','2022-10-28 09:00:00','2022-10-28 12:00:00');
/*Innere Medizin 2023*/
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','11','14','1','Seminar','2022-10-24 09:00:00','2022-10-24 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','11','14','2','Praktikum','2022-10-25 09:00:00','2022-10-25 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','11','14','3','Praktikum','2022-10-1 09:00:00','2022-10-1 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','11','14','4','Seminar','2022-10-27 09:00:00','2022-10-27 12:00:00');
INSERT INTO sessions (lecturer_id,block_id,group_id,sess_id,sess_type,sess_start_time,sess_end_time) value ('dozierende@test.de','11','14','5','Praktikum','2022-10-28 09:00:00','2022-10-28 12:00:00');

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

INSERT INTO accounts ( first_name, last_name, email, account_pwd, account_role) value ('Max','Admin','admin@admin','a85b6a20813c31a8b1b3f3618da796271c9aa293b3f809873053b21aec501087', 'scidaDekanat');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, account_role) value ('Sabine','Sekretariat','sek@test.de','a8327d4a49d4631631d090a72297d8d749337a30e6eb0416bd3655b71e36481b', 'scidaSekretariat');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, account_role) value ('Peter','Dekanat','dekanat@test.de','a8327d4a49d4631631d090a72297d8d749337a30e6eb0416bd3655b71e36481b', 'scidaDekanat');
INSERT INTO accounts ( first_name, last_name, email, account_pwd, account_role) value ('Petra','Doz','dozierende@test.de','a8327d4a49d4631631d090a72297d8d749337a30e6eb0416bd3655b71e36481b', 'B');/*  B for externe Dozierende */

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

/* 7381103 */
/*Chirurgie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','1','7381103','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','1','7381103','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','2','7381103','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','2','7381103','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','3','7381103','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','3','7381103','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','4','7381103','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','4','7381103','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','5','7381103','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','5','7381103','dozierende@test.de','2023-08-07');

/*Pädiatrie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','4','1','7381103','dozierende@test.de','2022-08-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','7','1','7381103','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','4','2','7381103','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','7','2','7381103','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','4','3','7381103','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','7','3','7381103','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','4','4','7381103','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','7','4','7381103','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','4','5','7381103','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','7','5','7381103','dozierende@test.de',NULL);


/*Gynäkologie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','4','1','7381103','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','9','1','7381103','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','4','2','7381103','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','9','2','7381103','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','4','3','7381103','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','9','3','7381103','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','4','4','7381103','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','9','4','7381103','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','4','5','7381103','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','9','5','7381103','dozierende@test.de','2023-08-07');

/*Innere Medizin*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','12','1','7381103','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','14','1','7381103','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','12','2','7381103','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','14','2','7381103','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','12','3','7381103','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','14','3','7381103','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','12','4','7381103','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','14','4','7381103','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','12','5','7381103','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','14','5','7381103','dozierende@test.de','2023-08-07');

/* 7162534 */
/*Chirurgie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','1','7162534','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','1','7162534','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','2','7162534','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','2','7162534','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','3','7162534','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','3','7162534','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','4','7162534','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','4','7162534','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','5','7162534','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','5','7162534','dozierende@test.de','2023-08-07');

/*Pädiatrie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','1','7162534','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','1','7162534','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','2','7162534','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','2','7162534','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','3','7162534','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','3','7162534','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','4','7162534','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','4','7162534','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','5','7162534','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','5','7162534','dozierende@test.de','2023-08-07');


/*Gynäkologie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','1','7162534','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','1','7162534','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','2','7162534','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','2','7162534','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','3','7162534','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','3','7162534','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','4','7162534','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','4','7162534','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','5','7162534','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','5','7162534','dozierende@test.de','2023-08-07');

/*Innere Medizin*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','1','7162534','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','1','7162534','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','2','7162534','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','2','7162534','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','3','7162534','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','3','7162534','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','4','7162534','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','4','7162534','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','5','7162534','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','5','7162534','dozierende@test.de','2023-08-07');

/* 1234567 */
/*Chirurgie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','1','1234567','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','1','1234567','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','2','1234567','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','2','1234567','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','3','1234567','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','3','1234567','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','4','1234567','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','4','1234567','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','5','1234567','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','5','1234567','dozierende@test.de','2023-08-07');

/*Pädiatrie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','1','1234567','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','1','1234567','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','2','1234567','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','2','1234567','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','3','1234567','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','3','1234567','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','4','1234567','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','4','1234567','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','5','1234567','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','5','1234567','dozierende@test.de','2023-08-07');


/*Gynäkologie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','1','1234567','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','1','1234567','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','2','1234567','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','2','1234567','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','3','1234567','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','3','1234567','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','4','1234567','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','4','1234567','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','5','1234567','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','5','1234567','dozierende@test.de','2023-08-07');

/*Innere Medizin*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','1','1234567','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','1','1234567','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','2','1234567','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','2','1234567','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','3','1234567','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','3','1234567','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','4','1234567','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','4','1234567','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','5','1234567','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','5','1234567','dozierende@test.de','2023-08-07');

/* 7382509 */
/*Chirurgie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','1','7382509','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','1','7382509','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','2','7382509','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','2','7382509','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','3','7382509','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','3','7382509','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','4','7382509','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','4','7382509','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','5','7382509','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','5','7382509','dozierende@test.de','2023-08-07');

/*Pädiatrie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','1','7382509','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','1','7382509','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','2','7382509','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','2','7382509','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','3','7382509','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','3','7382509','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','4','7382509','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','4','7382509','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','5','7382509','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','5','7382509','dozierende@test.de','2023-08-07');


/*Gynäkologie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','1','7382509','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','1','7382509','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','2','7382509','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','2','7382509','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','3','7382509','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','3','7382509','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','4','7382509','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','4','7382509','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','5','7382509','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','5','7382509','dozierende@test.de','2023-08-07');

/*Innere Medizin*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','1','7382509','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','1','7382509','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','2','7382509','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','2','7382509','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','3','7382509','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','3','7382509','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','4','7382509','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','4','7382509','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','5','7382509','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','5','7382509','dozierende@test.de','2023-08-07');

/* 7387340 */
/*Chirurgie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','1','7387340','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','1','7387340','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','2','7387340','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','2','7387340','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','3','7387340','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','3','7387340','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','4','7387340','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','4','7387340','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','5','7387340','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','5','7387340','dozierende@test.de','2023-08-07');

/*Pädiatrie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','1','7387340','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','1','7387340','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','2','7387340','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','2','7387340','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','3','7387340','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','3','7387340','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','4','7387340','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','4','7387340','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','5','7387340','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','5','7387340','dozierende@test.de','2023-08-07');


/*Gynäkologie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','1','7387340','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','1','7387340','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','2','7387340','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','2','7387340','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','3','7387340','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','3','7387340','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','4','7387340','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','4','7387340','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','5','7387340','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','5','7387340','dozierende@test.de','2023-08-07');

/*Innere Medizin*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','1','7387340','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','1','7387340','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','2','7387340','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','2','7387340','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','3','7387340','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','3','7387340','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','4','7387340','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','4','7387340','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','5','7387340','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','5','7387340','dozierende@test.de','2023-08-07');

/* 7383442 */
/*Chirurgie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','1','7383442','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','1','7383442','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','2','7383442','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','2','7383442','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','3','7383442','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','3','7383442','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','4','7383442','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','4','7383442','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('1','1','5','7383442','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('2','5','5','7383442','dozierende@test.de','2023-08-07');

/*Pädiatrie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','1','7383442','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','1','7383442','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','2','7383442','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','2','7383442','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','3','7383442','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','3','7383442','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','4','7383442','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','4','7383442','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('4','1','5','7383442','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('5','5','5','7383442','dozierende@test.de','2023-08-07');


/*Gynäkologie*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','1','7383442','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','1','7383442','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','2','7383442','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','2','7383442','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','3','7383442','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','3','7383442','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','4','7383442','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','4','7383442','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('7','1','5','7383442','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('8','5','5','7383442','dozierende@test.de','2023-08-07');

/*Innere Medizin*/
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','1','7383442','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','1','7383442','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','2','7383442','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','2','7383442','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','3','7383442','dozierende@test.de','2022-11-07');
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','3','7383442','dozierende@test.de',NULL);

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','4','7383442','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','4','7383442','dozierende@test.de','2023-08-07');

INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('10','1','5','7383442','dozierende@test.de',NULL);
INSERT INTO attendance (block_id,group_id,sess_id,matrikelnummer,lecturer_id,confirmed_at) value ('11','5','5','7383442','dozierende@test.de','2023-08-07');

