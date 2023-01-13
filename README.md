# Scida

## Beschreibung
Scida ist eine Webanwendung, die es Studenten und Dozenten erleichtern soll, Anwesenheit zu prüfen und nachzuhalten.
Scida digitalisiert den bisherigen Prozess der Laufzettel und erhöht die Sicherheit.
Das Projekt wurde von von der Medizinischen Fakultät der Universität zu Köln unter Leitung von Philipp Schmeling in Auftrag gegeben.

## Installation
Scida nutzt _Node.js_ als Plattformübergreifende Open-Source-JavaScript-Laufzeitumgebung.
Zum erfolgreichen Ausführen des Codes werden folgende Schritte benötigt:

- Installation von Node.js https://nodejs.org/en/download/
- Installation von Next.js und React `npm install next react react-dom`
- Installation von Tailwind CSS `npm install tailwindcss`
- Installation der React Library Framer-motion `npm install framer-motion`
- Installation der Tailwind CSS component library DaisyUI `npm install daisyui`
- Installation des Node.js Moduls zum Hochladen von Dateien `npm install formidable`
- Installation des CSV-Packages fast-csv `npm i fast-csv`
- Installation von Mysql `npm i mysql`
- Installation von Playwright als end-to-end Testing Library `npm init playwright@latest`
- Installation von Papa Parse als CSV Parser für JavaScript `npm i papaparse`
- Installation von Next Auth als Authentication Solution für NEXT.js `npm i next-auth`

**Testdaten zum Simulieren** 
<br> Anleitung, um (fast) dieselbe Datenbank wie auf der VM lokal einzurichten:
1. Installiere MySQL Server 8.0 auf https://dev.mysql.com/downloads/ (Wähle Version "mysql community server")
2. (Optional:) Installiere eine GUI, z.B. MySQL Workbench
3. Passwort "@UniKoeln123" für root konfigurieren
4. Öffne Terminal
5. Logge in Terminal ein mit "mysql -u root -p" und drücke Enter-Taste
6. Falls Fehlermeldung "zsh: command not found: mysql" erscheint: "export PATH=${PATH}:/usr/local/mysql/bin/" eintippen und Enter-Taste drücken
7. Gib "mysql -u root -p" erneut ein und drücke Enter-Taste 
8. Lade Datei herunter, die die Daten enthält (https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8248bff8-47c7-4c45-9c03-4d335a98abe5/clone_to_local_empty_table.sql?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230113T185140Z&X-Amz-Expires=86400&X-Amz-Signature=f3bbabae34644af43eeb5ea630b761e0d7f7dc61755efb8af9aceebc965fc66c&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22clone_to_local_empty_table.sql%22&x-id=GetObject)
9. Kopiere den Pfad, der zur Stelle führt, an der du auf deinem PC die Datei abgelegt hast
10. Gib nun Folgendes im Terminal ein: "source {Pfadname}" (sieht etwa so aus: "source ~/Documents/…/clone_to_local_test_data.sql"), nun laden sichtbar Daten
11. Gehe nun in das Directory dieses Projekts, öffne dort ein Terminal und installiere mysql mit dem Befehl "npm install mysql2"
12. Fertig! Jetzt kannst du das Programm samt Testdaten auf deinem PC testen
13. Zum Beenden: gehe wieder in das Terminal, tippe "exit" und drücke die Enter-Taste

Sobald die DB aufgesetzt ist, existiert ein Admin-Account mit den Zugangsdaten: Email: admin@admin und dem Passwort: testpwd. Damit kann man sich auf Scida anmelden und gelangt zunächst in die Dekanatsansicht. Hier muss als erstes das System mit Daten gespeist werden. Hierzu auf der Seite "CSV hochladen" folgende Datei mit Testdaten hochladen. Die Datei liegt in diesem Repository im "public"-Ordner und heißt "klips_Matrikelnummer.csv". Anschließend können diese Daten in verschiedenen Ansichten manipuliert und/oder ergänzt werden.


**Wichtig**: <br> 
- Um auf das Dekanat/Sekretariat-Dashboard zu gelangen, müssen mit dem Admin-Account (s. Anweisungen oben) entsprechende neue Accounts angelegt werden.
- Um auf das Studierenden-Dashboard zu gelangen, kann man sich mit seinem Studierenden-LDAP-Account einloggen.
- Um auf das Dozierenden-Dashboard zu gelangen, kann man sich mit seinem Beschäftigten-LDAP-Account oder einem vom Admin erstellten Account einloggen.

## Issues
Issue weight spiegeln die Priorisierung der User Stories durch den Product-Owner wider.
<br>
-  0 wont have
-  3 could have
-  6 should have
-  9 must have

## Roadmap
Wir teilen die Arbeit in verschiedene zweiwöchige Sprints auf:

### Sprint 1:

- [x] [i36]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/36
- [x] [i14]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/14
- [x] [i13]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/13
- [x] [i1]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/1

### Sprint 2:

- [x] [i64]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/64
- [x] [i32]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/32
- [x] [i75]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/75
- [ ] [i63]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/63
- [x] [i28]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/28
- [x] [i22]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/22
- [x] [i2]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/2

### Sprint 3:

- [x] [i63]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/63
- [x] [i76]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/76
- [x] [i77]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/77
- [x] [i81]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/81
- [x] [i82]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/82
- [x] [i83]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/83
- [x] [i31]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/31
- [x] [i26]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/26

### Sprint 4:
### Sprint 5:


## Autoren
Unser Team besteht aus 6 Entwicklern und dem Product-Owner

### Entwickler:
- Felicia Preuß-Neudorf
- Jingwen Yi
- Jonas Wetzel
- Lukas Schrayßhuen
- Marc Peter
- Michelle Binder

### Product-Owner:
- Philipp Schmeling


## Project Status
Das Projekt befindet sich aktuell im 3. Sprint.
