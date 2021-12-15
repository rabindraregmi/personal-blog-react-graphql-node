import mongoose from "mongoose";
import {
  blogSchema,
  categorySchema,
  profileSchema,
  userSchema,
} from "./schema";

export const UserModel = mongoose.model("User", userSchema);
export const ProfileModel = mongoose.model("Profile", profileSchema);
export const CategoryModel = mongoose.model("Category", categorySchema);
export const BlogModel = mongoose.model("Blog", blogSchema);
