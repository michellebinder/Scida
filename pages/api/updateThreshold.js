// Importieren Sie die notwendigen Module und Funktionen
const mysql = require("mysql2");
import { getSession } from "next-auth/react";

// Die updateThreshold API-Handler-Funktion
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
      // Extrahieren Sie die Daten aus dem Request-Body
      const { blockId, newThreshold } = req.body;

      // Überprüfen Sie, ob die Daten vorhanden sind
      if (blockId && newThreshold) {
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

        // Aktualisieren Sie die Bestehensgrenze für den gegebenen Block
        connection.query(
          "UPDATE blocks SET attendance_threshold=? WHERE block_id=?",
          [newThreshold, blockId],
          (err, results) => {
            // Trennen Sie die Datenbankverbindung sicher
            connection.end();

            // Wenn ein Fehler auftritt, senden Sie eine Fehlerantwort
            if (err) {
              console.error(err); // Gibt den spezifischen Fehler in der Konsole aus

              res
                .status(500)
                .json({ error: "Datenbankaktualisierung fehlgeschlagen" });
              return;
            }

            // Senden Sie eine Erfolgsantwort, wenn die Aktualisierung erfolgreich war
            res
              .status(200)
              .json({ message: "Bestehensgrenze erfolgreich aktualisiert" });
          }
        );
      } else {
        // Senden Sie eine Fehlerantwort, wenn die erforderlichen Daten fehlen
        res
          .status(400)
          .json({ error: "Fehlende Daten für die Aktualisierung" });
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
