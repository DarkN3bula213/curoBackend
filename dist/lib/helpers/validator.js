"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiAuthBearer = exports.JoiUrlEndpoint = exports.JoiObjectId = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const ApiErrors_1 = require("../api/ApiErrors");
const logger_1 = require("../logger/logger");
const constants_1 = require("../constants");
const Logger = new logger_1.Logger(__filename);
const JoiObjectId = () => joi_1.default.string().custom((value, helpers) => {
    if (!mongoose_1.Types.ObjectId.isValid(value))
        return helpers.error("any.invalid");
    return value;
}, "Object Id Validation");
exports.JoiObjectId = JoiObjectId;
const JoiUrlEndpoint = () => joi_1.default.string().custom((value, helpers) => {
    if (value.includes("://"))
        return helpers.error("any.invalid");
    return value;
}, "Url Endpoint Validation");
exports.JoiUrlEndpoint = JoiUrlEndpoint;
const JoiAuthBearer = () => joi_1.default.string().custom((value, helpers) => {
    if (!value.startsWith("Bearer "))
        return helpers.error("any.invalid");
    if (!value.split(" ")[1])
        return helpers.error("any.invalid");
    return value;
}, "Authorization Header Validation");
exports.JoiAuthBearer = JoiAuthBearer;
exports.default = (schema, source = constants_1.ValidationSource.BODY) => (req, res, next) => {
    try {
        const { error } = schema.validate(req[source]);
        if (!error)
            return next();
        const { details } = error;
        const message = details
            .map((i) => i.message.replace(/['"]+/g, ""))
            .join(",");
        Logger.error(message);
        next(new ApiErrors_1.BadRequestError(message));
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=validator.js.map