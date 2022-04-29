import { Knex } from "knex";
import databaseSchema from "../databaseSchema";
const tb = databaseSchema.loggerusersTable;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tb.tab_tableName).del();

  // Inserts seed entries
  await knex(tb.tab_tableName).insert({
    [tb.col_username]: "ACME",
    [tb.col_password]: "1234",
    [tb.col_isAdmin]: 1,
    [tb.col_comment]: "Testowy-do skasowania na produkcji",
  });
}
