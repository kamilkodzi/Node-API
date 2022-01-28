// const mysql = require("mysql2");
import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_MYSQL_HOST,
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASS,
  database: process.env.DB_MYSQL_DATABASE,
});

export default db;