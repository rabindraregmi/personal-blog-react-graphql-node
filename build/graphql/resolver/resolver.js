"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const models_1 = require("../../db/models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../../auth"));
const resolvers = {
    Query: {
        login: async (_, { email, password }) => {
            const user = await models_1.UserModel.findOne({ email }).select("+password");
            if (!user) {
                throw new Error("User does not exist");
            }
            const valid = await bcryptjs_1.default.compare(password, String(user.password));
            if (!valid) {
                throw new Error("Incorrect password");
            }
            const token = jwt.sign({
                userId: user.id,
                user_name: user.user_name,
            }, process.env.SECRET_KEY || "SECRET_KEY", {
                expiresIn: "1h",
            });
            return {
                userId: user.id,
                token,
                tokenExpiration: 1,
            };
        },
        authorize: async (_, { token }, context) => {
            if (await (0, auth_1.default)(token))
                return true;
            else
                return false;
        },
        getUserProfile: async () => {
            const user = await models_1.UserModel.find().select("-password");
            return user;
        },
        getCategories: async () => await models_1.CategoryModel.find(),
        //@ts-ignore
        getAllBlogPost: async (_, args, context) => {
            var _a;
            if (!context.user)
                throw new apollo_server_express_1.AuthenticationError("User not authorised");
            return await models_1.BlogModel.find(Object.assign({ title: { $regex: ((_a = args) === null || _a === void 0 ? void 0 : _a.search) || "", $options: "i" } }, args.query))
                .populate("category")
                .sort({ created_at: "desc" });
        },
        getPublishedBlogPost: async (_, args) => {
            var _a;
            return await models_1.BlogModel.find({
                published: true,
                title: { $regex: ((_a = args) === null || _a === void 0 ? void 0 : _a.search) || "", $options: "i" },
            })
                .populate("category")
                .sort({ created_at: "desc" });
        },
        getOneBlogPost: async (_, { id }) => {
            try {
                const blog = await models_1.BlogModel.exists({ _id: id });
                if (!blog)
                    throw new Error("Blog Doesn't Exist");
                return models_1.BlogModel.findById(id);
            }
            catch (error) {
                throw new Error("Blog for given ID not found");
            }
        },
    },
    Mutation: {
        createUser: async (_, { user }, context) => {
            if (!context.user)
                throw new apollo_server_express_1.AuthenticationError("User not authorised");
            const found = await models_1.UserModel.findOne({ email: user.email });
            if (found) {
                throw new Error("User exists already.");
            }
            const hashedPassword = await bcryptjs_1.default.hash(user.password, 12);
            const newUser = new models_1.UserModel(Object.assign(Object.assign({}, user), { email: user.email, password: hashedPassword }));
            return await newUser.save();
        },
        editUser: async (_, { user }, context) => {
            var _a;
            if (!context.user)
                throw new apollo_server_express_1.AuthenticationError("User not authorised");
            //@ts-ignore
            const updateUser = await models_1.UserModel.findByIdAndUpdate((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id, { $set: Object.assign({}, user) }, { new: true });
            return updateUser;
        },
        deleteUser: async (_, { id }, context) => {
            if (!context.user)
                throw new apollo_server_express_1.AuthenticationError("User not authorised");
            const deletedUser = await models_1.UserModel.findByIdAndDelete(id);
            return deletedUser;
        },
        createCategory: async (_, { category }, context) => {
            if (!context.user)
                throw new apollo_server_express_1.AuthenticationError("User not authorised");
            try {
                const newCategory = new models_1.CategoryModel({
                    name: category.name,
                    description: category.description,
                });
                await newCategory.save();
                return newCategory;
            }
            catch (error) {
                throw new apollo_server_express_1.ValidationError(error);
            }
        },
        createBlogPost: async (_, { blog }, context) => {
            if (!context.user)
                throw new apollo_server_express_1.AuthenticationError("User not authorised");
            const { title, subtitle, content, published, category } = blog;
            try {
                const newBlog = new models_1.BlogModel({
                    title,
                    subtitle,
                    content,
                    published,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                });
                await newBlog.save();
                return newBlog;
            }
            catch (error) {
                throw new apollo_server_express_1.ValidationError(error);
            }
        },
        editBlogPost: async (_, { blog }, context) => {
            if (!context.user)
                throw new apollo_server_express_1.AuthenticationError("User not authorised");
            const { id, title, subtitle, content, published, category } = blog;
            const _blog = await models_1.BlogModel.exists({ _id: id });
            if (!_blog)
                throw new Error("Blog Doesn't Exist");
            try {
                const newBlog = models_1.BlogModel.findByIdAndUpdate(id, {
                    title: title,
                    subtitle: subtitle,
                    content: content,
                    published: published,
                    updated_at: Date.now(),
                });
                return newBlog;
            }
            catch (error) {
                throw new apollo_server_express_1.ValidationError(error);
            }
        },
        deleteBlogPost: async (_, { id }, context) => {
            if (!context.user)
                throw new apollo_server_express_1.AuthenticationError("User not authorised");
            const _blog = await models_1.BlogModel.findOne({ id });
            if (!_blog)
                throw new Error("Blog doesn't exist");
            try {
                const deletedBlog = models_1.BlogModel.findByIdAndDelete(id);
                return deletedBlog;
            }
            catch (error) {
                throw new apollo_server_express_1.ValidationError(error);
            }
        },
    },
};
exports.default = resolvers;
