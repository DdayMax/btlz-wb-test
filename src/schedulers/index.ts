import { startGoogleSheetsScheduler } from "./googleSheets.scheduler.js";
import { startWbScheduler } from "./wb.scheduler.js";

export function startSchedulers() {
    startWbScheduler();
    startGoogleSheetsScheduler();
}
