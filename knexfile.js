// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql2",
    version: "8.0.27",
    connection: {
      host: process.env.DB_MYSQL_HOST,
      port: 3306,
      user: process.env.DB_MYSQL_USER,
      password: process.env.DB_MYSQL_PASS,
      database: process.env.DB_MYSQL_DATABASE,
    },
    pool: { min: 0, max: 7 },
  },
};
