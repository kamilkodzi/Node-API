import mysql from "mysql2";
import knex from "knex";
import knexfile from "../knexfile.js";

// const db = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_MYSQL_HOST,
//   user: process.env.DB_MYSQL_USER,
//   password: process.env.DB_MYSQL_PASS,
//   database: process.env.DB_MYSQL_DATABASE,
// });

const db = knex(knexfile.development);

export default db;
