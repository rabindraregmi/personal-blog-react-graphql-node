"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("./db/models");
const getUser = async (authToken) => {
    const authHeader = authToken;
    if (!authHeader) {
        return null;
    }
    const token = authHeader; // Bearer token_here
    if (!token || token === "") {
        return null;
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "SECRET_KEY");
    }
    catch (error) {
        return null;
    }
    if (!decodedToken) {
        return null;
    }
    //@ts-ignore
    let user = await models_1.UserModel.findById(decodedToken.userId);
    return user;
};
exports.default = getUser;
