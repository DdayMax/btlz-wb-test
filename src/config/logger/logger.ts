import log4js from "log4js";

log4js.configure({
    appenders: {
        console: {
            type: "stdout",
        },
        app: {
            type: "file",
            filename: "logs/app.log",
        },
        error: {
            type: "file",
            filename: "logs/error.log",
        },
    },
    categories: {
        default: {
            appenders: ["console", "app"],
            level: "info",
        },
        error: {
            appenders: ["console", "error"],
            level: "error",
        },
    },
});

export const logger = log4js.getLogger();
export const errorLogger = log4js.getLogger("error");
