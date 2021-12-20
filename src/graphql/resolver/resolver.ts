import { AuthenticationError, ValidationError } from "apollo-server-express";
import { BlogModel, CategoryModel, UserModel } from "../../db/models";
import { Resolvers } from "../../generated/types";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import getUser from "../../auth";

const resolvers: Resolvers = {
  Query: {
    login: async (_, { email, password }) => {
      const user = await UserModel.findOne({ email }).select("+password");
      if (!user) {
        throw new Error("User does not exist");
      }
      const valid = await bcrypt.compare(password, String(user.password));
      if (!valid) {
        throw new Error("Incorrect password");
      }
      const token = jwt.sign(
        {
          userId: user.id,
          user_name: user.user_name,
        },
        process.env.SECRET_KEY || "SECRET_KEY",
        {
          expiresIn: "1h",
        }
      );
      return {
        userId: user.id,
        token,
        tokenExpiration: 1,
      };
    },
    authorize: async (_, { token }, context) => {
      if (await getUser(token)) return true;
      else return false;
    },
    getUserProfile: async () => {
      const user = await UserModel.find().select("-password");
      return user;
    },
    getCategories: async () => await CategoryModel.find(),
    //@ts-ignore
    getAllBlogPost: async (_, args, context) => {
      if (!context.user) throw new AuthenticationError("User not authorised");

      return await BlogModel.find({
        title: { $regex: (args as any)?.search || "", $options: "i" },
        ...args.query,
      })
        .populate("category")
        .sort({ created_at: "desc" });
    },
    getPublishedBlogPost: async (_, args) => {
      return await BlogModel.find({
        published: true,
        title: { $regex: (args as any)?.search || "", $options: "i" },
      })
        .populate("category")
        .sort({ created_at: "desc" });
    },
    getOneBlogPost: async (_, { id }) => {
      try {
        const blog = await BlogModel.exists({ _id: id });

        if (!blog) throw new Error("Blog Doesn't Exist");
        return BlogModel.findById(id);
      } catch (error) {
        throw new Error("Blog for given ID not found");
      }
    },
  },
  Mutation: {
    createUser: async (_, { user }, context) => {
      if (!context.user) throw new AuthenticationError("User not authorised");
      const found = await UserModel.findOne({ email: user.email });
      if (found) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(user.password as string, 12);
      const newUser = new UserModel({
        ...user,
        email: user.email,
        password: hashedPassword,
      });
      return await newUser.save();
    },

    editUser: async (_, { user }, context) => {
      if (!context.user) throw new AuthenticationError("User not authorised");
      //@ts-ignore
      const updateUser = await UserModel.findByIdAndUpdate(
        context?.user?.id,
        { $set: { ...user } },
        { new: true }
      );

      return updateUser;
    },
    deleteUser: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError("User not authorised");
      const deletedUser = await UserModel.findByIdAndDelete(id);
      return deletedUser;
    },

    createCategory: async (_, { category }, context) => {
      if (!context.user) throw new AuthenticationError("User not authorised");
      try {
        const newCategory = new CategoryModel({
          name: category.name,
          description: category.description,
        });
        await newCategory.save();
        return newCategory;
      } catch (error) {
        throw new ValidationError(error as any);
      }
    },
    createBlogPost: async (_, { blog }, context) => {
      if (!context.user) throw new AuthenticationError("User not authorised");
      const { title, subtitle, content, published, category } = blog;
      try {
        const newBlog = new BlogModel({
          title,
          subtitle,
          content,
          published,
          created_at: Date.now(),
          updated_at: Date.now(),
        });
        await newBlog.save();
        return newBlog;
      } catch (error) {
        throw new ValidationError(error as any);
      }
    },
    editBlogPost: async (_, { blog }, context) => {
      if (!context.user) throw new AuthenticationError("User not authorised");
      const { id, title, subtitle, content, published, category } = blog;
      const _blog = await BlogModel.exists({ _id: id });

      if (!_blog) throw new Error("Blog Doesn't Exist");

      try {
        const newBlog = BlogModel.findByIdAndUpdate(id, {
          title: title,
          subtitle: subtitle,
          content: content,
          published: published,
          updated_at: Date.now(),
        });

        return newBlog;
      } catch (error) {
        throw new ValidationError(error as any);
      }
    },
    deleteBlogPost: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError("User not authorised");
      const _blog = await BlogModel.findOne({ id });

      if (!_blog) throw new Error("Blog doesn't exist");
      try {
        const deletedBlog = BlogModel.findByIdAndDelete(id);
        return deletedBlog;
      } catch (error) {
        throw new ValidationError(error as any);
      }
    },
  },
};

export default resolvers;
