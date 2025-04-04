import e from "express";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 100,
    },
    picturePath : {
      type: String,
      default: "",
    },
    userPicturePath: {
        type: String,
    },
    likes: { 
      type: Map, 
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;