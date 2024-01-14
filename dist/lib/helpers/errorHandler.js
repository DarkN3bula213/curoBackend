"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = exports.errorHandler = void 0;
const logger_1 = require("../logger/logger");
const env_1 = require("../../env");
const ApiErrors_1 = require("../api/ApiErrors");
const Logger = new logger_1.Logger(__filename);
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiErrors_1.ApiError) {
        ApiErrors_1.ApiError.handle(err, res);
        if (err.type === ApiErrors_1.ErrorType.INTERNAL)
            Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    else {
        Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        Logger.error(err.message);
        if (env_1.env.isDevelopment) {
            Logger.error(err.message);
            return res.status(500).send(err);
        }
        ApiErrors_1.ApiError.handle(new ApiErrors_1.InternalError(), res);
    }
};
exports.errorHandler = errorHandler;
const errors = (err, req, res, next) => {
    if (err instanceof ApiErrors_1.ApiError) {
        ApiErrors_1.ApiError.handle(err, res);
    }
    else {
        if (env_1.env.isDevelopment) {
            Logger.error(err.message);
            return res.status(500).send(err.message);
        }
        ApiErrors_1.ApiError.handle(new ApiErrors_1.InternalError(), res);
    }
};
exports.errors = errors;
//# sourceMappingURL=errorHandler.js.map