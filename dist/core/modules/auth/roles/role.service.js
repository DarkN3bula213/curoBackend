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
const role_model_1 = require("./role.model");
class RoleService {
    static findByRoleCode(rolecode) {
        return __awaiter(this, void 0, void 0, function* () {
            return role_model_1.RoleModel.findOne({ role: rolecode }).lean().exec();
        });
    }
    static findByCodes(codes) {
        return __awaiter(this, void 0, void 0, function* () {
            return role_model_1.RoleModel.find({ code: { $in: codes }, status: true })
                .lean()
                .exec();
        });
    }
}
exports.default = new RoleService();
//# sourceMappingURL=role.service.js.map