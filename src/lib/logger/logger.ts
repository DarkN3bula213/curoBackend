import dayjs from "dayjs";
import * as path from "path";
import * as winston from "winston";
 
/**
 * core.Log
 * ------------------------------------------------
 *
 * This is the main Logger Object. You can create a scope logger
 * or directly use the static log methods.
 *
 * By Default it uses the debug-adapter, but you are able to change
 * this in the start up process in the core/index.ts file.
 */
const customTimestampFormat = winston.format((info, opts) => {
  info.timestamp = dayjs().format("DD-MM-YY HH:mm:ss"); // Customize the format as needed
  return info;
})();
let date = new Date();

export class Logger {
  public static DEFAULT_SCOPE = "app";

  private static logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
      winston.format.colorize(),
      customTimestampFormat,
      winston.format.printf(
        (info) => `${(info.timestamp)} [${info.level}]: ${info.message}`
      )
    ),
    transports: [new winston.transports.Console()],
  });

  private static parsePathToScope(filepath: string): string {
    if (filepath.indexOf(path.sep) >= 0) {
      filepath = filepath.replace(process.cwd(), "");
      filepath = filepath.replace(`${path.sep}src${path.sep}`, "");
      filepath = filepath.replace(`${path.sep}dist${path.sep}`, "");
      filepath = filepath.replace(".ts", "");
      filepath = filepath.replace(".js", "");
      filepath = filepath.replace(path.sep, ":");
    }
    return filepath;
  }

  private scope: string;

  constructor(scope?: string) {
    this.scope = Logger.parsePathToScope(scope ? scope : Logger.DEFAULT_SCOPE);
  }

  public debug(message: string, ...args: any[]): void {
    this.log("debug", message, args);
  }

  public info(message: string, ...args: any[]): void {
    this.log("info", message, args);
  }

  public warn(message: string, ...args: any[]): void {
    this.log("warn", message, args);
  }

  public error(message: string, ...args: any[]): void {
    this.log("error", message, args);
  }

  private log(level: string, message: string, args: any[]): void {
    Logger.logger.log({
      level,
      message: `[${this.scope}] ${message}`,
      extra: args,
    });
  }

  private formatScope(): string {
    return `[${this.scope}]`;
  }
}
