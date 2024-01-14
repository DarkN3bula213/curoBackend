"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDirectory = exports.tokenInfo = exports.corsUrl = exports.db = exports.port = exports.environment = void 0;
// Mapper for environment variables
exports.environment = process.env.NODE_ENV;
exports.port = process.env.PORT;
exports.db = {
    devUrl: process.env.DB_DEV,
    prodUrl: process.env.DB_PROD,
    firebaseConfig: process.env.FIREBASE_CONFIG_BASE64,
};
exports.corsUrl = process.env.CORS_URL;
exports.tokenInfo = {
    accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS),
    refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_DAYS),
    issuer: process.env.TOKEN_ISSUER,
    audience: process.env.TOKEN_AUDIENCE,
};
exports.logDirectory = process.env.LOG_DIR;
//# sourceMappingURL=config.js.map