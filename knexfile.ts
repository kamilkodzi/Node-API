import "dotenv/config";
import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    version: "5.7.38",
    connection: {
      host: process.env.DB_MYSQL_HOST,
      port: 3306,
      user: process.env.DB_MYSQL_USER,
      password: process.env.DB_MYSQL_PASS,
      database: process.env.DB_MYSQL_DATABASE,
    },
    pool: { min: 0, max: 10 },
    migrations: {
      tableName: "migrations",
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};

export default config;
