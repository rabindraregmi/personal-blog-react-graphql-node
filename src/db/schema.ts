import mongoose, { ObjectId } from "mongoose";
const { Schema } = mongoose;

export const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: false,
    required: true,
  },
  profile: {
    full_name: {
      type: String,
      unique: false,
      required: true,
    },
    mobile_number: {
      type: String,
      unique: false,
      required: false,
    },
    phone_number: {
      type: String,
      unique: false,
      required: false,
    },
    address: {
      type: String,
      unique: false,
      required: false,
    },
    intro: {
      type: String,
      unique: false,
      required: false,
    },
    social: {
      github: {
        type: String,
        required: false,
      },
      twitter: {
        type: String,
        required: false,
      },
      instagram: String,
      linkedin: String,
    },
  },
});

export const profileSchema = new Schema({
  full_name: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    unique: false,
    required: false,
  },
  mobile_number: {
    type: String,
    unique: false,
    required: false,
  },
  phone_number: {
    type: String,
    unique: false,
    required: false,
  },
  address: {
    type: String,
    unique: false,
    required: false,
  },
  intro: {
    type: String,
    unique: false,
    required: false,
  },
  social: {
    github: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    instagram: String,
    linkedin: String,
  },
});

export const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

export const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  published: {
    type: Schema.Types.Boolean,
    default: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  created_at: {
    type: String,
    default: Date.now(),
  },
  updated_at: {
    type: String,
    default: Date.now(),
  },
});
