"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../env");
const logger_1 = require("../lib/logger/logger");
const log = new logger_1.Logger(__filename);
// Build the connection string
const dbURI = env_1.env.isDevelopment ? env_1.env.db.dev : env_1.env.db.prod;
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
const connect = (app) => {
    const options = {
        useNewUrlParser: true,
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
    };
    const no_of_retries = 25;
    const connectWithRetry = () => {
        mongoose_1.default.Promise = global.Promise;
        log.info("MongoDB connection with retry");
        mongoose_1.default
            .connect(env_1.env.mongo.uri)
            .then(() => {
            log.info(`Connected to MongoDB: ${mongoose_1.default.connection.host}`);
            app.emit("ready");
        })
            .catch((err) => {
            log.error("MongoDB connection unsuccessful, retry after 2 seconds.", err);
            setTimeout(connectWithRetry, 2000);
        }).finally(() => {
            process.on("SIGINT", () => {
                mongoose_1.default.connection.close();
                process.exit(0);
            });
        });
    };
    connectWithRetry();
};
exports.connect = connect;
//# sourceMappingURL=index.js.map