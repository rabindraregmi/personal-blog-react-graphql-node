"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = exports.CategoryModel = exports.ProfileModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema");
exports.UserModel = mongoose_1.default.model("User", schema_1.userSchema);
exports.ProfileModel = mongoose_1.default.model("Profile", schema_1.profileSchema);
exports.CategoryModel = mongoose_1.default.model("Category", schema_1.categorySchema);
exports.BlogModel = mongoose_1.default.model("Blog", schema_1.blogSchema);
