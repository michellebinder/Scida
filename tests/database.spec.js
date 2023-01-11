const mysql = require ('mysql2/promise');

(async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password:'@UniKoeln123',
            database: 'scida'
        });
        console.log('Connected succesfully to database');
    } catch (error){
        console.log("Error connection to the database: ", error);
    }
})();