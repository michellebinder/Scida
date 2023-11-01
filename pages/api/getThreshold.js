// Importieren Sie die notwendigen Module und Funktionen
const mysql = require("mysql2");
import { getSession } from "next-auth/react";

// Die getThreshold API-Handler-Funktion
export default async (req, res) => {
  const session = await getSession({ req });

  // Prüfen Sie, ob eine Sitzung vorhanden ist
  if (session) {
    // Berechtigungen basierend auf der Benutzerrolle prüfen
    var role = session.user.role; // Annahme, dass die Rolle direkt zugänglich ist
    try {
      //Try ldap, if not existent do catch with local accounts
      role = session.user.attributes.UniColognePersonStatus;
    } catch {
      role = session.user.account_role;
    }

    // Erlauben Sie nur autorisierten Rollen den Zugriff
    if (role === "scidaDekanat" || role === "scidaSekretariat") {
      // Extrahieren Sie die blockId aus dem Query-String
      const blockId = req.query.blockId;

      // Überprüfen Sie, ob die blockId vorhanden ist
      if (blockId) {
        // Verbindungsinformationen zur Datenbank
        const connection = mysql.createConnection({
          host: "127.0.0.1",
          user: "root",
          password: "@UniKoeln123",
          port: 3306,
          database: "test_db",
        });

        // Stellen Sie eine Verbindung zur Datenbank her
        connection.connect();

        // Abfragen Sie die Bestehensgrenze für den gegebenen Block
        connection.query(
          "SELECT attendance_threshold FROM blocks WHERE block_id = ?",
          [blockId],
          (err, results) => {
            // Trennen Sie die Datenbankverbindung sicher
            connection.end();

            if (err) {
              // Wenn ein Fehler auftritt, senden Sie eine Fehlerantwort
              res
                .status(500)
                .json({ error: "Datenbankabfrage fehlgeschlagen" });
            } else if (results.length > 0) {
              // Senden Sie eine Erfolgsantwort, wenn die Abfrage erfolgreich war
              res.status(200).json({
                attendance_threshold: results[0].attendance_threshold,
              });
            } else {
              // Wenn keine Daten gefunden wurden, senden Sie eine Fehlerantwort
              res.status(404).json({ error: "Keine Daten gefunden" });
            }
          }
        );
      } else {
        // Senden Sie eine Fehlerantwort, wenn die blockId fehlt
        res.status(400).json({ error: "Block-ID fehlt" });
      }
    } else {
      // Senden Sie eine Fehlerantwort, wenn der Benutzer nicht autorisiert ist
      res.status(403).json({ error: "Nicht autorisierter Zugriff" });
    }
  } else {
    // Senden Sie eine Fehlerantwort, wenn der Benutzer nicht authentifiziert ist
    res.status(401).json({ error: "Benutzer nicht authentifiziert" });
  }
};
