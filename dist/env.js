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
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const env_1 = require("./lib/env");
/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
    path: path.join(process.cwd(), `.env${process.env.NODE_ENV === "test" ? ".test" : ""}`),
});
/**
 * Environment variables
 */
exports.env = {
    node: process.env.NODE_ENV || "development",
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.NODE_ENV === "test",
    isDevelopment: process.env.NODE_ENV === "development",
    app: {
        // name: getOsEnv("APP_NAME"),
        // host: getOsEnv("APP_HOST"),
        // schema: getOsEnv("APP_SCHEMA"),
        // routePrefix: getOsEnv("APP_ROUTE_PREFIX"),
        port: (0, env_1.normalizePort)(process.env.PORT || (0, env_1.getOsEnv)("APP_PORT")),
        // banner: toBool(getOsEnv("APP_BANNER")),
    },
    cors: {
        url: (0, env_1.getOsEnv)('CORS_URL')
    },
    log: {
    // level: getOsEnv("LOG_LEVEL"),
    // output: getOsEnv("LOG_OUTPUT"),
    },
    db: {
        prod: (0, env_1.getOsEnvOptional)('PRODUCTION'),
        dev: (0, env_1.getOsEnv)("MONGO_URI")
        // type: getOsEnv("TYPEORM_CONNECTION"),
        // host: getOsEnvOptional("TYPEORM_HOST"),
        // username: getOsEnvOptional("TYPEORM_USERNAME"),
        // password: getOsEnvOptional("TYPEORM_PASSWORD"),
        // database: getOsEnv("TYPEORM_DATABASE"),
        // logging: toBool(getOsEnv("TYPEORM_LOGGING")),
    },
    mongo: {
        uri: (0, env_1.getOsEnv)("MONGO_URI"),
        // route: getOsEnv("GRAPHQL_ROUTE"),
        // editor: toBool(getOsEnv("GRAPHQL_EDITOR")),
    },
    redis: {
        uri: (0, env_1.getOsEnv)("REDIS_URI"),
        // route: getOsEnv("GRAPHQL_ROUTE"),
        // editor: toBool(getOsEnv("GRAPHQL_EDITOR")),
    },
    // token:{
    //   secret: getOsEnv("TOKEN_SECRET"),
    //   public:{
    //     access: getDecodedOsEnv("ACCESS_TOKEN_PUBLIC_KEY"),
    //     refresh: getDecodedOsEnv("REFRESH_TOKEN_PUBLIC_KEY"),
    //   },
    //   private:{
    //     access: getDecodedOsEnv("ACCESS_TOKEN_PRIVATE_KEY"),
    //     refresh: getDecodedOsEnv("REFRESH_TOKEN_PRIVATE_KEY"),
    //   },
    //   access:{
    //     private:getDecodedOsEnv("ACCESS_TOKEN_PRIVATE_KEY"),
    //     public:getDecodedOsEnv("ACCESS_TOKEN_PUBLIC_KEY"),
    //     // public: getOsEnv("ACCESS_TOKEN_PUBLIC_KEY"),
    //     // private: getOsEnv("ACCESS_TOKEN_PRIVATE_KEY"),
    //     // expiration: getOsEnv("ACCESS_TOKEN_EXPIRATION"),
    //   },
    //   refresh:{
    //     private:getDecodedOsEnv("REFRESH_TOKEN_PRIVATE_KEY"),
    //     public:getDecodedOsEnv("REFRESH_TOKEN_PUBLIC_KEY"),
    //     // public: getOsEnv("REFRESH_TOKEN_PUBLIC_KEY"),
    //     // private: getOsEnv("REFRESH_TOKEN_PRIVATE_KEY"),
    //     // expiration: getOsEnv("REFRESH_TOKEN_EXPIRATION"),
    //   }
    // }
};
//# sourceMappingURL=env.js.map