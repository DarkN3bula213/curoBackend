"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const path = __importStar(require("path"));
const winston = __importStar(require("winston"));
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
    info.timestamp = (0, dayjs_1.default)().format("DD-MM-YY HH:mm:ss"); // Customize the format as needed
    return info;
})();
let date = new Date();
class Logger {
    static parsePathToScope(filepath) {
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
    constructor(scope) {
        this.scope = Logger.parsePathToScope(scope ? scope : Logger.DEFAULT_SCOPE);
    }
    debug(message, ...args) {
        this.log("debug", message, args);
    }
    info(message, ...args) {
        this.log("info", message, args);
    }
    warn(message, ...args) {
        this.log("warn", message, args);
    }
    error(message, ...args) {
        this.log("error", message, args);
    }
    log(level, message, args) {
        Logger.logger.log({
            level,
            message: `[${this.scope}] ${message}`,
            extra: args,
        });
    }
    formatScope() {
        return `[${this.scope}]`;
    }
}
exports.Logger = Logger;
Logger.DEFAULT_SCOPE = "app";
Logger.logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(winston.format.colorize(), customTimestampFormat, winston.format.printf((info) => `${(info.timestamp)} [${info.level}]: ${info.message}`)),
    transports: [new winston.transports.Console()],
});
//# sourceMappingURL=logger.js.map