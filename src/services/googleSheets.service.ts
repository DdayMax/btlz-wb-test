/** Src/services/googleSheetsService.ts */
import { sheets } from "#config/google/googleClient.js";
import { STOCKS_SHEET } from "#constants/googleSheets.js";
import { getFormattedTariffs } from "#postgres/repos/wb.service.js";
import { getSpreadsheetIds } from "./googleSheets.repo.js";

let headersWritten = false;

async function writeHeaders(spreadsheetId: string) {
    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${STOCKS_SHEET.name}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: STOCKS_SHEET.headers },
    });
}

export async function updateAllSheets() {
    const sheetsIds = await getSpreadsheetIds();

    const values = await getFormattedTariffs("ASC");

    for (const sheet of sheetsIds) {
        const spreadsheetId = sheet.spreadsheet_id;
        if (!headersWritten) {
            writeHeaders(spreadsheetId);
        }
        await sheets.spreadsheets.values.clear({ spreadsheetId, range: STOCKS_SHEET.name });
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${STOCKS_SHEET.name}!A2`,
            valueInputOption: "RAW",
            requestBody: { values },
        });
        headersWritten = true;

        resizeDimension(spreadsheetId, values);
    }
}

function resizeDimension(spreadsheetId: string, values: unknown[][]) {
    sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
            requests: [
                {
                    autoResizeDimensions: {
                        dimensions: {
                            sheetId: 0,
                            dimension: "COLUMNS",
                            startIndex: 0,
                            endIndex: values[0].length,
                        },
                    },
                },
            ],
        },
    });
}
