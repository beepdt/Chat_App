# ChatApp Server

This repository contains the server-side code for the ChatApp project. The server is built using Node.js, Express, and MongoDB. It includes user authentication, file uploads, and various middleware for security and logging.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Middleware](#middleware)
- [Controllers](#controllers)
- [Routes](#routes)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/beepdt/ChatApp.git
    cd ChatApp/server
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```env
    PORT=6000
    MONGO_URL=mongodb+srv://username:password@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```sh
    npm start
    ```

## Usage

The server provides various API endpoints for user authentication and file uploads. It uses MongoDB as the database and includes middleware for security and logging.

## API Endpoints

### User Registration

- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user with a profile picture.
- **Request Body**:
    ```json
    {
      "username": "exampleUser",
      "email": "user@example.com",
      "password": "password123",
      "picture": "file"
    }
    ```

### User Login

- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: Logs in a user.
- **Request Body**:
    ```json
    {
      "username": "exampleUser",
      "password": "password123"
    }
    ```

### Get User

- **Endpoint**: `/user/:id`
- **Method**: `GET`
- **Description**: Retrieves a user by ID.
- **Headers**: 
    ```json
    {
      "Authorization": "Bearer <token>"
    }
    ```

### Get User Friends

- **Endpoint**: `/user/friends/:id`
- **Method**: `GET`
- **Description**: Retrieves a user's friends.
- **Headers**: 
    ```json
    {
      "Authorization": "Bearer <token>"
    }
    ```

### Add/Remove Friend

- **Endpoint**: `/user/:id/:friendId`
- **Method**: `PATCH`
- **Description**: Adds or removes a friend.
- **Headers**: 
    ```json
    {
      "Authorization": "Bearer <token>"
    }
    ```

### Get Feed Posts

- **Endpoint**: `/posts`
- **Method**: `GET`
- **Description**: Retrieves feed posts.
- **Headers**: 
    ```json
    {
      "Authorization": "Bearer <token>"
    }
    ```

### Like a Post

- **Endpoint**: `/posts/:id/like`
- **Method**: `PATCH`
- **Description**: Likes a post.
- **Headers**: 
    ```json
    {
      "Authorization": "Bearer <token>"
    }
    ```

## Models

### User Model

The `User` model is defined in `server/models/user.js` and represents a user in the application. It includes the following fields:

- `username`: A unique string representing the user's username (required, min length: 3, max length: 20).
- `email`: A unique string representing the user's email (required).
- `password`: A string representing the user's password (required, min length: 6).
- `verifyOTP`: A string for storing the OTP used for email verification (default: "").
- `isVerified`: A boolean indicating whether the user's email is verified (default: false).
- `verifyOTPExpires`: A date indicating when the verification OTP expires (default: current date).
- `resetOTP`: A string for storing the OTP used for password reset (default: "").
- `resetOTPExpires`: A date indicating when the reset OTP expires (default: current date).
- `picturePath`: A string representing the path to the user's profile picture (default: "https://github.com/yourusername/yourrepo/blob/main/path/to/default/image.jpg?raw=true").
- `friends`: An array of friends (default: []).

The schema also includes timestamps for `createdAt` and `updatedAt`.

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    verifyOTP: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyOTPExpires: {
      type: Date,
      default: Date.now(),
    },
    resetOTP: {
      type: String,
      default: "",
    },
    resetOTPExpires: {
      type: Date,
      default: Date.now(),
    },
    picturePath: {
      type: String,
      default: "https://github.com/yourusername/yourrepo/blob/main/path/to/default/image.jpg?raw=true",
    },
    friends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
```

### Post Model

The `Post` model is defined in `server/models/post.js` and represents a post in the application. It includes the following fields:

- `userId`: A string representing the ID of the user who created the post (required).
- `description`: A string representing the description of the post.
- `picturePath`: A string representing the path to the post's picture.
- `likes`: An array of user IDs who liked the post (default: []).
- `comments`: An array of comments on the post (default: []).

The schema also includes timestamps for `createdAt` and `updatedAt`.

```javascript
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    picturePath: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
```

## Middleware

### Auth Middleware

The `auth` middleware is defined in `server/middleware/auth.js` and is used to verify JWT tokens.

```javascript
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        let token = req.headers("Authorization");

        if (!token) {
            return res.status(403).json({ error: "Access denied" });
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
```

## Controllers

### Auth Controller

The `auth` controller is defined in `server/controllers/auth.js` and handles user registration and login.

```javascript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async (req, res) => {
  try {
    const { username, email, password, picturePath, friends } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        picturePath,
        friends,
    });
    
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
    }
    catch (error) {
    res.status(500).json({ error: error.message });
    }
}
```

### User Controller

The `user` controller is defined in `server/controllers/user.js` and handles user-related operations.

```javascript
import User from '../models/user.js';

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formatedFriends = friends.map(
            ({_id, username, picturePath}) => {
                return {_id, username, picturePath};
            }
        );
        res.status(200).json(formatedFriends);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((fid) => fid !== id);
        }
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formatedFriends = friends.map(
            ({_id, username, picturePath}) => {
                return {_id, username, picturePath};
            }
        );
        res.status(200).json(formatedFriends);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
```

### Posts Controller

The `posts` controller is defined in `server/controllers/posts.js` and handles posts-related operations.

```javascript
import Post from '../models/post.js';
import User from '../models/user.js';

export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const likePosts = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            post.likes = post.likes.filter((id) => id !== userId);
        } else {
            post.likes.push(userId);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const newPost = new Post({
            userId,
            description,
            picturePath,
            likes: [],
            comments: [],
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
```

## Routes

### Auth Routes

The `auth` routes are defined in `server/routes/auth.js` and handle authentication-related endpoints.

```javascript
import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
```

### User Routes

The `user` routes are defined in `server/routes/user.js` and handle user-related endpoints.

```javascript
import express from 'express';
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', verifyToken, getUser);
router.get('/friends/:id', verifyToken, getUserFriends);
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
```

### Posts Routes

The `posts` routes are defined in `server/routes/posts.js` and handle posts-related endpoints.

```javascript
import express from "express";
import { getFeedPosts, getUserPosts, likePosts, createPost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePosts);
router.post("/", verifyToken, createPost);

export default router;
```

## Environment Variables

The server uses the following environment variables, which should be defined in a `.env` file in the root directory:

- `PORT`: The port on which the server will run (default: 6000).
- `MONGO_URL`: The MongoDB connection string.
- `JWT_SECRET`: The secret key used for signing JWT tokens.

## License

This project is licensed under the MIT License.