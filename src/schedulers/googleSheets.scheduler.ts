import { errorLogger, logger } from "#config/logger/logger.js";
import { updateAllSheets } from "#services/googleSheets.service.js";
import cron from "node-cron";

export function startGoogleSheetsScheduler() {
    cron.schedule("*/4 * * * *", async () => {
        try {
            logger.info("Updating Google Sheets");
            await updateAllSheets();
            logger.info("Google Sheets updated successfully");
        } catch (error) {
            errorLogger.error("Google Sheets update failed: ", error);
        }
    });
}
