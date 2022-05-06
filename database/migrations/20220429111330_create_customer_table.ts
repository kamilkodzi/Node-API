import { Knex } from "knex";
import databaseSchema from "../databaseSchema";
const tb = databaseSchema.customersTable;

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tb.tab_tableName, (table) => {
    table.increments("id").primary().notNullable().unique();
    table
      .string(tb.col_systemName, tb.col_systemName_max_length)
      .unique()
      .notNullable();
    table.string(tb.col_comments, tb.col_comments_max_length);
  }).raw(`ALTER TABLE ${tb.tab_tableName}
  ADD UNIQUE INDEX id_UNIQUE (id ASC) S;`);
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tb.tab_tableName);
}
