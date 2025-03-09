import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import yup from "yup";
import { useForm } from "react-hook-form";

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const LoginForm = () => {

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white rounded shadow"
      onSubmit={(e) => {
        e.preventDefault();
        // Handle login logic here
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

      <div className="mb-6">
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

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;
