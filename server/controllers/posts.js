import Post from '../models/post.js';
import User from '../models/user.js';

//CREATE//
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body; // Get the userId, description, and picturePath from the request body
        const user = await User.findById(userId); // Find the user by the userId
        const newPost = new Post({ 
            username: user.username,
            userPicturePath: user.picturePath,
            description, 
            picturePath, 
            userId,
            likes: {},
        }); // Create a new post with the description, picturePath, and userId and the user's username and picturePath

        await newPost.save(); // Save the new post
        const posts = await Post.find(); // Find all posts

        res.status(201).json(posts); // Respond with the posts
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
}

//READ//
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find(); // Find all posts
        res.status(200).json(posts); // Respond with the posts
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params; // Get the userId from the request parameters
        const posts = await Post.find({ userId }); // Find all posts with the userId
        res.status(200).json(posts); // Respond with the posts
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}

//UPDATE//
export const likePosts = async (req, res) => {
    try {
        const { id } = req.params; // Get the post id from the request parameters
        const post = await Post.findById(id); // Find the post by the id
        const { userId } = req.body; // Get the userId from the request body
        const isLiked = post.likes.get(userId); // Check if the user has already liked the post 

        if (isLiked) {
            post.likes.delete(userId) ; // Unlike the post
        }
        else {
            post.likes.set(userId, true); // Like the post
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        ); // Update the post with the new likes data

        res.status(200).json(post); // Respond with the post
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}