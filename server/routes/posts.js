import express from "express";
import {getFeedPosts, getUserPosts, likePosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*GET POSTS */
router.get("/", verifyToken, getFeedPosts);
