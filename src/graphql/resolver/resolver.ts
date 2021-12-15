import { ValidationError } from "apollo-server";
import { CategoryModel } from "../../db/models";
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
  },
};

export default resolvers;
