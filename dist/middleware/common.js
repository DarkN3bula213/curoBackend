"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const env_1 = require("../env");
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("../core/routes"));
const api_1 = require("../lib/api");
const errorHandler_1 = require("../lib/helpers/errorHandler");
function default_1(app) {
    app.use((0, express_1.json)({ limit: "10mb" }));
    app.use((0, express_1.urlencoded)({
        limit: "10mb",
        extended: true,
        parameterLimit: 50000,
    }));
    app.use((0, cors_1.default)({ origin: env_1.env.cors.url, optionsSuccessStatus: 200 }));
    app.use((0, morgan_1.default)("tiny"));
    app.use("/api", routes_1.default);
    app.use((req, res, next) => next(new api_1.NotFoundError()));
    app.use(errorHandler_1.errorHandler);
}
exports.default = default_1;
//# sourceMappingURL=common.js.map