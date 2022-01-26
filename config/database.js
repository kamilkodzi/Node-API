const mysql = require("mysql2");

module.exports = mysql.createConnection({
  host: process.env.DB_MYSQL_HOST,
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASS,
  database: process.env.DB_MYSQL_DATABASE,
});
