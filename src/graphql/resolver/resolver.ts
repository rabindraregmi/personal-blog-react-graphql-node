import { ValidationError } from "apollo-server";
import { BlogModel, CategoryModel } from "../../db/models";
import { Resolvers } from "../../generated/types";

const resolvers: Resolvers = {
  Query: {
    getCategories: async () => await CategoryModel.find(),
  },
  Mutation: {
    createCategory: async (_, { category }) => {
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
    createBlogPost: async (_, { blog }) => {
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
    editBlogPost: async (_, { blog }) => {
      const { id, title, subtitle, content, published, category } = blog;
      const _blog = await BlogModel.findOne({ id });

      if (!_blog) throw new Error("Blog Doesn't Exist");

      try {
        const newBlog = BlogModel.findByIdAndUpdate(id, {
          title,
          subtitle,
          content,
          published,
          created_at: Date.now(),
          updated_at: Date.now(),
        });

        return newBlog;
      } catch (error) {
        throw new ValidationError(error as any);
      }
    },
    deleteBlogPost: async (_, { id }) => {
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
