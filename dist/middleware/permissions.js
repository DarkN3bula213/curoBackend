"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../lib/api");
exports.default = (permission) => (req, res, next) => {
    try {
        if (!req.apiKey)
            return next(new api_1.ForbiddenError("Permission Denied"));
        const exists = req.apiKey.permissions.find((entry) => entry === permission);
        if (!exists)
            return next(new api_1.ForbiddenError("Permission Denied"));
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=permissions.js.map