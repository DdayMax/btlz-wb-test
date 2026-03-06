import knex from "#postgres/knex.js";
import { SpreadsheetDb } from "./types/spreadSheets.types.js";

export function getSpreadsheetIds(): Promise<SpreadsheetDb[]> {
    return knex("spreadsheets").select("spreadsheet_id");
}
