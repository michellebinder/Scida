const mysql = require('mysql2/promise');
const { playwright, default: test } = require('@playwright/test');
const assert = require ('assert');


test('Database connection',async () => { 
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password:'@UniKoeln123',
            database: 'test_db',
        });

        try{
            await connection.execute('SELECT * FROM ACCOUNTS');
            assert.ok(true,'Connection to Database successful.');
        } catch (error) {
            assert.fail('Error connecting to Database: ,${error}');
        }finally {
            connection.end();
        }
    });