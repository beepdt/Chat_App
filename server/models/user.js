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