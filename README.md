# Scida

## Beschreibung
Scida ist eine Webanwendung, die es Student:innen und Dozent:innen erleichtern soll, Anwesenheiten zu prüfen und nachzuhalten. 
Die Anwendung digitalisiert den Prozess im Medizinstudium, bei dem die Anwesenheit in Praktika erfasst wird. Bisher wurde die Anwesenheit immer analog auf Papier festgehalten. Die Student:innen brachten zu jedem Praktikum sogenannte "Laufzettel" mit, auf dem die Dozent:innen dann unterschrieben. Durch die Digitalisierung dieses Prozesses wird bürokratischer Aufwand vermindert und die Sicherheit erhöht.

Das Projekt wurde von von der Medizinischen Fakultät der Universität zu Köln unter Leitung von Philipp Schmeling in Auftrag gegeben.

## Dokumentation
Eine umfangreiche Dokumentation unserer Software finden Sie in unserem [Projekt-Wiki](https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/wikis/home).

## Installation
Um die Webanwendung auf Ihrem Computer nutzen zu können, müssen folgende Schritte ausgeführt werden:
1. Installation von Node.js
2. Klonen des Projekts
3. Installation von MYSQL und Aufsetzen einer lokalen Datenbank
4. Einwählen in das Uni-VPN
5. Starten der Anwendung, Öffnen der Website und Login

**1. Installation von Node.js** <br>
Scida nutzt _Node.js_ als plattformübergreifende Open-Source-JavaScript-Laufzeitumgebung.
Zum erfolgreichen Ausführen des Codes werden folgende Schritte benötigt:

- Installieren Sie Node.js unter https://nodejs.org/en/download/.
- Öffnen Sie das Terminal auf Ihrem Computer.
- Installieren Sie Next.js und React mit folgendem Befehl `npm install next react react-dom`.
- Installieren Sie alle weiteren Libraries mit dem Befehl `npm install`.

**2. Klonen des Projekts** <br>
Um den Code zum Testen des Projekts zu verwenden, müssen Sie das Projekt klonen. Dazu öffnen Sie Ihr Terminal und navigieren sich in den Ordner, in dem Sie das Projekt auf Ihrem PC ablegen möchten. Geben Sie dann folgenden Befehl ein: `git clone https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida.git`.

**3. Installation von MYSQL und Aufsetzen einer lokalen Datenbank** <br>
Zum Testen der Website werden Testdaten benötigt. Die Testdaten stellen wir Ihnen zur Verfügung. Gehen Sie in den Ordner, in den Sie das Projekt zuvor geklont haben und navigieren Sie weiter in den Ordner 'mysql'. Hier finden Sie eine Datei namens 'clone_to_local_test_data.sql'. 
Um die Testdaten verwenden zu können, müssen Sie sich eine Datenbank aufsetzen.
Das Passwort lautet '@UniKoeln123'. Wenn Sie in einem der Schritte danach gefragt werden, geben Sie es ein.
<br> <br> Anleitung, um eine Datenbank zum Testen der Website aufzusetzen:
1. Installieren Sie den MySQL Server 8.0 auf https://dev.mysql.com/downloads/ (Wählen Sie die Version "mysql community server").
2. Öffnen Sie das Terminal.
3. Loggen Sie sich im Terminal ein mit `mysql -u root -p` und drücken Sie die Enter-Taste. Geben Sie ggf. das Passwort ein.
4. Falls die Fehlermeldung "zsh: command not found: mysql" erscheint, geben Sie folgenden Befehl ein: `export PATH=${PATH}:/usr/local/mysql/bin/` und drücken Sie die Enter-Taste.
5. Geben Sie `mysql -u root -p` erneut ein, drücken Sie die Enter-Taste und geben Sie das Passwort ein.
6. Gehen Sie in den Ordner, in dem das Projekt liegt, dort weiter in den mysql Ordner, bis Sie die Datei mit dem Namen 'clone_to_local_test_data.sql' sehen. Kopieren Sie den Pfad zu dieser Datei.
7. Geben Sie nun Folgendes im Terminal ein: `source {Pfadname}` (sieht etwa so aus: `source ~/Desktop/…/clone_to_local_test_data.sql`). Nun laden sichtbar Daten.
8. Fertig! Jetzt können Sie die Testdaten verwenden.
9. Zum Beenden: Gehen Sie wieder in das Terminal, tippen Sie `exit` und drücken Sie die Enter-Taste.

Sobald die DB aufgesetzt ist, existieren folgende Test-Accounts:
- Zwei Admin-Accounts: 
    - Email: admin@admin und Passwort: testpwd
    - Email: dekanat@test.de und Passwort: 123test
- Sekretariats-Account: Email: sek@test.de und Passwort: 123test
- Dozierenden-Account: Email: dozierende@test.de und Passwort: 123test

Hinweis: Alternativ zu der 'clone_to_local_test_data.sql'-Datei können Sie auch die 'clone_to_local_empty_table.sql'-Datei in der obigen Anleitung verwenden. Im Ordner 'public' findet sich die Datei 'klips_Matrikelnummer.csv', die Sie dann über den CSV-Upload ins System einpflegen können. Bitte beachten Sie dabei jedoch, dass in diesem Falle Dozierenden- und Sekretariats-Accounts sowie die Termine der Praktika manuell angelegt werden müssen. In dieser Variante existiert nur ein Admin Account mit folgenden Zugangsdaten: Email: 'admin@admin' Passwort: 'testpwd'.

**4. Einwählen in das Uni-VPN** <br>
Wählen Sie sich in das VPN der Universität zu Köln ein. Dazu kann z.B. folgende Anleitung verwendet werden: https://rrzk.uni-koeln.de/internetzugang-web/netzzugang/vpn.

**5. Starten der Anwendung, Öffnen der Website und Login** <br>
Öffnen Sie das Terminal. Navigieren Sie in den Ordner, in dem das Projekt liegt. Tippen Sie folgenden Befehl ein: `npm run dev`. Öffnen Sie dann Ihren Browser und tippen Sie folgende URL ein: http://localhost:3000.

Fertig! Sie können sich nun mit den oben genannten Accounts einloggen. <br>
Hinweis zu den Accounts: Die Anwendung hat vier verschiedene Nutzergruppen: Admins (Dekanat), Sekretariat, Dozierende und Studierende.
Loggen Sie sich mit den jeweiligen Accounts ein, um auf die entsprechenden Seiten zu gelangen. Um auf die Ansicht der Studierenden zu gelangen, brauchen Sie einen Studierenden-Account an der Universität zu Köln.
Wenn Sie sich mit einem solchen Account einloggen, werden Sie noch keine Praktikumsdaten finden. Sie können sich jedoch als Admin (Dekanat oder Sekretariat) einloggen, dann auf den Reiter 'Praktika' klicken, einen der Termine auswählen und 'Teilnehmer:in hinzufügen' klicken.
Wenn Sie da die Matrikelnummer Ihres Studierenden-Uni-Accounts eingeben, speichern und sich dann mit besagtem Account einloggen, wird das entsprechende Praktikum erscheinen. 
<br>
<br>
**Hinweis**: Da der Responsive-Modus von vielen Browsern tendenziell fehleranfällig ist, sowie React/NEXT.js damit weniger gut harmoniert, würden wir Sie bitten, diesen Modus nicht zu verweden. Stattdessen kann man die Responsiveness der Anwendung testen, indem man den localhost des Rechners im Netzwerk (Wlan) freischaltet und dann die IP-Adresse des Routers mit dem entprechenden Port (auf dem die Anwendung läuft) auf dem entsprechenden Mobilgerät aufruft. 
<br>
<br>
Viel Spaß beim Testen der Anwendung!

__________________________________________________________________________________________________________________________________________________

## Issues
Issue weight spiegeln die Priorisierung der User Stories durch den Product-Owner wider.
<br>
-  0 wont have
-  3 could have
-  6 should have
-  9 must have

## Roadmap
Wir teilen die Arbeit in verschiedene Sprints auf:

### Sprint 1:

- [x] [i36]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/36
- [x] [i14]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/14
- [x] [i13]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/13
- [x] [i1]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/1

### Sprint 2:

- [x] [i64]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/64
- [x] [i32]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/32
- [x] [i75]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/75
- [x] [i63]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/63
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
- [x] [i3]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/3
- [x] [i4]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/4
- [x] [i5]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/5
- [x] [i6]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/6
- [x] [i7]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/7
- [x] [i8]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/8
- [x] [i9]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/9
- [x] [i10]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/10
- [x] [i11]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/11
- [x] [i12]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/12
- [x] [i15]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/15
- [x] [i16]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/16
- [x] [i17]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/17
- [x] [i18]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/18
- [x] [i19]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/19
- [x] [i20]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/20
- [x] [i21]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/21
- [x] [i23]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/23
- [x] [i24]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/24
- [x] [i27]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/27
- [x] [i29]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/29
- [x] [i30]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/30
- [x] [i34]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/34
- [x] [i35]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/35
- [x] [i37]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/37
- [x] [i38]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/38
- [x] [i80]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/80
- [x] [i105]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/105
- [x] [i106]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/106
- [x] [i107]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/107
- [x] [i108]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/108
- [x] [i111]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/111
- [x] [i114]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/114

### Sprint 5:
- [x] [i33]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/33 
- [x] [i39]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/39
- [x] [i126]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/126
- [x] [i127]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/127
- [x] [i128]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/128
- [x] [i129]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/129
- [x] [i130]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/130
- [x] [i131]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/131
- [x] [i132]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/132
- [x] [i133]: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-11/scida/-/issues/133

### Entwickler:innen
- Felicia Preuß-Neudorf
- Jingwen Yi
- Jonas Wetzel
- Lukas Schrayßhuen
- Marc Peter
- Michelle Binder

### Product-Owner:
- Philipp Schmeling
