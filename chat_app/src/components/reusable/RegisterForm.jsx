import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import yup from "yup";
import { useForm } from "react-hook-form";

const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
  profilePicture: yup.mixed().required("Profile picture is required"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
  profilePicture: null,
};

const RegisterForm = () => {
  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-8 bg-white rounded shadow"
      onSubmit={(e) => {
        e.preventDefault();
        // Handle form submission here
      }}
    >
      <div className="mb-4">
        <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          className="mt-1 block w-full"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="mt-1 block w-full"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="mt-1 block w-full"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
          Profile Picture
        </Label>
        <Input
          id="profilePicture"
          name="profilePicture"
          type="file"
          accept="image/*"
          className="mt-1 block w-full"
        />
      </div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default RegisterForm;
