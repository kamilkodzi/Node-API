import { Knex } from "knex";
import databaseSchema from "../databaseSchema";
const tb = databaseSchema.loggerusersTable;

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tb.tab_tableName, (table) => {
    table
      .string(tb.col_username, tb.col_username_max_length)
      .primary()
      .unique();
    table.string(tb.col_password, tb.col_password_max_length).notNullable();
    table.boolean(tb.col_isAdmin).defaultTo(0);
    table.string(tb.col_comment, tb.col_comment_max_length);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tb.tab_tableName);
}
