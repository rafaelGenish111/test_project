// require('dotenv').config();
// const mysql = require('mysql2/promise');

// async function connectToDatabase() {
//   try {
//     const connection = await mysql.createConnection({
//       port: process.env.TEST_PORT,
//       host: process.env.TEST_HOST,
//       user: process.env.TEST_USER,
//       password: process.env.TEST_PASSWORD,
//       database: process.env.TEST_DATABASE
//     });

//     console.log('Connected to MySQL database!');

//     connection.on('error', async (err) => {
//       console.error('MySQL error:', err);
//       if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//         console.log('Reconnecting to MySQL...');
//         try {
//           // יצירת חיבור חדש במקום ניסיון חיבור מחדש
//           db = await connectToDatabase();
//           console.log('Reconnected successfully!');
//         } catch (reconnectError) {
//           console.error('Failed to reconnect:', reconnectError);
//           // טיפול נוסף בשגיאה, לדוגמה המתנה או יציאה
//         }
//       } else {
//         console.error('Unhandled MySQL error:', err);
//       }
//     });

//     return connection;
//   } catch (initialError) {
//     console.error('Initial connection error:', initialError);
//     throw initialError;
//   }
// }

// let db; // הגדרת db מחוץ לפונקציה main כדי שיהיה נגיש ל Query

// async function main() {
//   try {
//     db = await connectToDatabase(); // שימוש ב await
//     const [rows] = await db.execute('SELECT 1+1 AS solution');
//     console.log(rows);
//   } catch (error) {
//     console.error('An error occurred in main:', error);
//   }
// }

// async function Query(q, params) { // הפונקציה Query כעת אסינכרונית
//   try {
//     const [results] = await db.execute(q, params);
//     return results;
//   } catch (err) {
//     console.error("Query error:", err);
//     throw err; // חשוב לזרוק את השגיאה כדי שהקוד שקורא לפונקציה יוכל לטפל בה
//   }
// }

// async function runQueries() {
//   try {
//     await main(); // הפעלת main כדי ליצור את החיבור
//     const results = await Query('SELECT * FROM users'); // שימוש ב await וטיפול בשגיאה
//     console.log("Query results:", results);
//     await db.end(); // סגירת החיבור לאחר השימוש
//   } catch (error) {
//     console.error("Error running queries:", error);
//   }
// }

// runQueries();

// module.exports = Query
require('dotenv').config();
const mysql = require('mysql2');

const host = process.env.TEST_HOST
const port = process.env.TEST_PORT
const user = process.env.TEST_USER
const password = process.env.TEST_PASSWORD
const database = process.env.TEST_DATABASE


const handleDisconnect = () => {
    const db = mysql.createConnection({
        host, 
        port,
        user,
       password,
        database
    });

    db.connect(err => {
        if (err) {
            console.error('Error reconnecting to MySQL: ', err)
            setTimeout(handleDisconnect, 2000)
        } else {
            console.log('Reconnected to MySQL!');
        }
    });

    db.on('error', err => {
        console.error('MySQL error: ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect()
        } else {
            throw err;
        }
    });
    return db
};

const db = handleDisconnect()

const Query = (q, params) => {
    return new Promise((resolve, reject) => {
        db.query(q, params, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        });
    });
};

module.exports = Query;