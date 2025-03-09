# ChatApp Server

This repository contains the server-side code for the ChatApp project. The server is built using Node.js, Express, and MongoDB. It includes user authentication, file uploads, and various middleware for security and logging.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
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
    MONGO_URL=your_mongodb_connection_string
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
- `picturePath`: A string representing the path to the user's profile picture (default: "").
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
      default: "",
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