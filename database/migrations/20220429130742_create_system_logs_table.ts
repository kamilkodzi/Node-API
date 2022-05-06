import { Knex } from "knex";
import databaseSchema from "../databaseSchema";
const tb = databaseSchema.systemlogsTablel;

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tb.tab_tableName, (table) => {
    table.increments(tb.col_id);
    table.primary([tb.col_id, tb.col_preventDuplicateId2]);
    table.datetime(tb.col_logWasCreated);
    table.datetime(tb.col_logWasUploadedToApi);
    table.string(tb.col_sendFromSource, tb.col_sendFromSource_max_length);
    table.string(tb.col_sendFromSystem, tb.col_sendFromSystem_max_length);
    table.string(tb.col_sendFromCustomer, tb.col_sendFromCustomer_max_length);
    table.string(tb.col_sendFromUser, tb.col_sendFromUser_max_length);
    table.string(tb.col_shortDescription, tb.col_shortDescription_max_length);
    table.string(tb.col_longDescription, tb.col_longDescription_max_length);
    table.boolean(tb.col_isShowingAnError);
    table.string(tb.col_errorCode, tb.col_errorCode_max_length);
    table.string(tb.col_errorDescription, tb.col_errorDescription_max_length);
    table.string(tb.col_comment, tb.col_comment_max_length);
    table
      .string(tb.col_preventDuplicateId2, tb.col_preventDuplicateId2_max_length)
      .notNullable()
      .unique();
  }).raw(`ALTER TABLE ${tb.tab_tableName}
  ADD UNIQUE INDEX id_UNIQUE (id ASC) ;`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tb.tab_tableName);
}
