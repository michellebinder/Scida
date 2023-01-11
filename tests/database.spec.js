const mysql = require ('mysql2/promise');

test("navbar contains title, logo and links to intro page", async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password:'@UniKoeln123',
            database: 'test_db'
        });
        console.log('Connected succesfully to database');
    } catch (error){
        console.log("Error connection to the database: ", error);
    }
})();