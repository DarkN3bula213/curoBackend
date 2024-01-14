"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByCodes = exports.RoleModel = exports.RoleCode = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "roles";
exports.COLLECTION_NAME = "roles";
var RoleCode;
(function (RoleCode) {
    RoleCode["LEARNER"] = "LEARNER";
    RoleCode["WRITER"] = "WRITER";
    RoleCode["EDITOR"] = "EDITOR";
    RoleCode["ADMIN"] = "ADMIN";
})(RoleCode || (exports.RoleCode = RoleCode = {}));
const schema = new mongoose_1.Schema({
    code: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        enum: Object.values(RoleCode),
    },
    status: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
schema.index({ code: 1, status: 1 });
// Define custom static method
schema.statics.findByCode = function (code) {
    return __awaiter(this, void 0, void 0, function* () {
        const found = this.findOne({ code }).select("+code").lean().exec();
        return found;
    });
};
// Create the model
exports.RoleModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
function findByCodes(codes) {
    return __awaiter(this, void 0, void 0, function* () {
        return exports.RoleModel.find({ code: { $in: codes }, status: true })
            .lean()
            .exec();
    });
}
exports.findByCodes = findByCodes;
//# sourceMappingURL=role.model.js.map