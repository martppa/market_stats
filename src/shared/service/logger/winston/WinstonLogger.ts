import Winston = require("winston");
import Logger from "shared/domain/logger/Logger"
import Environment, { BUILD_DEBUG } from "shared/domain/env/Environment";

export default class WinstonLogger implements Logger {
    private static readonly DEBUG_LEVEL = "debug";

    private transportFile: any;
    private environment: Environment
    private logOutput: any;
    private appName: string;

    public constructor(environment: Environment) {
        this.environment = environment
        this.appName = global['app-name'];
        const logFormat = Winston.format.combine(Winston.format.timestamp(), Winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        }));
        this.logOutput = new Winston.transports.Console({
            format: logFormat
        });
        Winston.add(this.logOutput);
        if (environment.getBuildType() === BUILD_DEBUG) {
            Winston.level = WinstonLogger.DEBUG_LEVEL;
        }
    }

    public info(tag: string, message: string): void {
        if (this.environment.isAllowedToPrintLogs()) {
            Winston.info(`${this.appName} => ${tag} - ${message}`);
        }
    }

    public warn(tag: string, message: string): void {
        if (this.environment.isAllowedToPrintLogs()) {
            Winston.warn(`${this.appName} => ${tag} - ${message}`);
        }
    }

    public error(tag: string, message: string, error: Error): void {
        if (this.environment.isAllowedToPrintLogs()) {
            let errorMessage = "";
            if (error) {
                if (Winston.level === WinstonLogger.DEBUG_LEVEL) {
                    errorMessage = error.stack;
                } else {
                    errorMessage = error.message;
                }
            }
            Winston.error(`${this.appName} => ${tag} - ${message} ${errorMessage}`);
        }
    }

    public debug(tag: string, message: string): void {
        if (this.environment.isAllowedToPrintLogs()) {
            Winston.debug(`${this.appName} => ${tag} - ${message}`);
        }
    }
}