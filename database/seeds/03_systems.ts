import { Knex } from "knex";
import databaseSchema from "../databaseSchema";
const tb = databaseSchema.systemsTable;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tb.tab_tableName).del();

  // Inserts seed entries
  await knex(tb.tab_tableName).insert([
    {
      [tb.col_systemName]: "RUOM",
      [tb.col_comments]: "Testowy-do skasowania na produkcji",
    },
    {
      [tb.col_systemName]: "SYS2TST",
      [tb.col_comments]: "Testowy-do skasowania na produkcji",
    },
    {
      [tb.col_systemName]: "SYSTEM4",
      [tb.col_comments]: "Testowy-do skasowania na produkcji",
    },
  ]);
}
