import mongoose from "mongoose";

// Posts
const postsSchema = new mongoose.Schema({
  id: {
    type: "string",
    required: true,
  },
  caption: {
    type: "string",
    required: true,
  },
  imageUrl: {
    type: "string",
    required: true,
  },
  likes: {
    type: "string",
    required: true,
  },
});

const postModel = new mongoose.model("post", postsSchema, "posts");

// users
const usersSchema = new mongoose.Schema({
  id: {
    type: "string",
    required: true,
  },
  username: {
    type: "string",
    required: true,
  },
  phone: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  bio: {
    type: "string",
    required: true,
  },
  profilePic: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  isAccountVerified: {
    type: "boolean",
    required: true,
  },
});

const userModel = new mongoose.model("user", usersSchema, "users");

export { userModel };
