
require("dotenv").config();
const mysql = require("mysql2");
console.log(process.env.DB_HOST);
const connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "Pranav@2506",
    database: "college",
    // port:process.env.DB_PORT
});

connection.connect(err => {
    if (err) {
        console.error("DB Connection Failed", err);
    } else {
        console.log("DB Connected");
    }
});

module.exports = connection;