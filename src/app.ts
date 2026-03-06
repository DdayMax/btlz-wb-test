import { logger } from "#config/logger/logger.js";
import { migrate, seed } from "#postgres/knex.js";
import { startSchedulers } from "#schedulers/index.js";

await migrate.latest();
await seed.run();
logger.info("All migrations and seeds have been run");

startSchedulers();
