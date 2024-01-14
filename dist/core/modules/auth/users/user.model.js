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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Constants for document and collection names
const DOCUMENT = "Account";
const COLLECTION = "Accounts";
// User Schema
const userSchema = new mongoose_1.Schema({
    username: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        maxlength: 200,
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        unique: true,
        sparse: true, // allows null
        trim: true,
        select: false,
        required: true,
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    roles: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'roles',
            },
        ],
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
userSchema.pre("save", function (done) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            const hashed = yield bcrypt_1.default.hash(this.get("password"), 10);
            this.set("password", hashed);
        }
        done();
    });
});
// Static Methods
userSchema.statics.duplicateCheck = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email });
        return !!user;
    });
};
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email }).exec();
};
userSchema.statics.updateByAnyField = function (field, value) {
    return this.updateMany({}, {
        $set: { [field]: value },
    });
};
// Create and export the model
const UserModel = (0, mongoose_1.model)(DOCUMENT, userSchema);
exports.default = UserModel;
// Define the static method
userSchema.statics.findByEmailAndPassword = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email }).select('+password'); // Assuming password field is not selected by default
        if (!user)
            return null;
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return null;
        return user;
    });
};
userSchema.statics.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = this;
            const result = yield bcrypt_1.default.compare(candidatePassword, user.password);
            return result;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    });
};
//# sourceMappingURL=user.model.js.map