import knex from "#postgres/knex.js";

export function getSpreadsheetIds() {
    return knex("spreadsheets").select("spreadsheet_id");
}
