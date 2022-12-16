/*pretend that we habe seperated bloxk name and group id while importing .csv file*/
USE test_db;
CREATE TABLE mytable_fake(
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
);
DELETE FROM mytable_fake;
INSERT INTO mytable_fake (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl) value ('9','Innere Medizin', '08','fix','5558107','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Pr�fung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13');
INSERT INTO mytable_fake (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl) value ('9','Chirurgie' ,'09','fix','5558107','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Pr�fung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13');
INSERT INTO mytable_fake (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl) value ('9','Pädiatrie','07','fix','5558107','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Pr�fung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13');
INSERT INTO mytable_fake (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl) value ('9','Gynäkologie','03','fix','5558107','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Pr�fung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13');
INSERT INTO mytable_fake (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl) value ('9','Innere Medizin', '08','fix','7162534','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Pr�fung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13');
INSERT INTO mytable_fake (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl) value ('9','Chirurgie' ,'09','fix','7162534','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Pr�fung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13');
INSERT INTO mytable_fake (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl) value ('9','Pädiatrie','07','fix','7162534','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Pr�fung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13');
INSERT INTO mytable_fake (lfdNr,Block_name,Gruppe,Platz,Matrikelnummer,Abschlussziel,SPOVersion,StudienID,Studium,Fachsemester,Anmeldedatum,Kennzahl) value ('9','Gynäkologie','03','fix','7162534','Staatsexamen','08 107 Humanmedizin (HG-NRW/20132, Studium mit staatlicher Pr�fung, laufend)','[1110 08 107]','Humanmedizin (HG-NRW) - Staatsexamen','11','15.09.2022,14:48','7,97791E+13');

