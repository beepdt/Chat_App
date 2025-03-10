import express from "express";
import {getFeedPosts, getUserPosts, likePosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import e from "express";

const router = express.Router();

/*GET POSTS */
router.get("/", verifyToken, getFeedPosts); // Get all posts
router.get("/:userId", verifyToken, getUserPosts); // Get all posts of a user

/*UPDATE POSTS */
router.patch("/:id/like", verifyToken, likePosts); // Like a post

export default router;