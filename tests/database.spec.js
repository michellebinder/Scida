const mysql = require("mysql2/promise");
const { playwright, default: test } = require("@playwright/test");

test("Database connection", async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@UniKoeln123",
    database: "test_db",
  });

  try {
    const [rows, fields] = await connection.execute(
      "SELECT first_name FROM accounts"
    );
    //console.log("Connection to database successful");
    //console.log("Rows: ", rows);
    //console.log("Fields: ", fields);
  } catch (error) {
    console.error("Error connecting to Database: ", error);
  } finally {
    connection.end();
  }
});
