import { errorLogger, logger } from "#config/logger/logger.js";
import { fetchAndSave } from "#services/wb.service.js";
import cron from "node-cron";

export function startWbScheduler() {
    cron.schedule("*/1 * * * *", async () => {
        try {
            logger.info("Starting WB tariffs update");
            await fetchAndSave(new Date());
            logger.info("WB tariffs saved successfully");
        } catch (error) {
            errorLogger.error("WB scheduler error: ", error);
        }
    });
}
