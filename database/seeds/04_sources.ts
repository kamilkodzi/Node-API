import { Knex } from "knex";
import databaseSchema from "../databaseSchema";
const tb = databaseSchema.sourcesTable;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tb.tab_tableName).del();

  // Inserts seed entries
  await knex(tb.tab_tableName).insert([
    {
      [tb.col_systemName]: "VERR.DBF",
      [tb.col_comments]: "Testowy-do skasowania na produkcji",
    },
    {
      [tb.col_systemName]: "SRC2TST",
      [tb.col_comments]: "Testowy-do skasowania na produkcji",
    },
  ]);
}
