// Import necessary libraries and components
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setLogin } from './../../state//index.js'; // Ensure correct import path
import dotenv from "dotenv";
import { apiClient } from "@/pages/HomePage/apiClient";
import { HOST } from "@/pages/HomePage/apiClient";
import { LOGIN_ROUTE } from "@/pages/HomePage/apiClient";

// Define validation schema using Yup
const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

// Define initial form values
const initialValues = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch(); // Initialize dispatch from Redux
  const navigate = useNavigate(); // Initialize navigate from React Router
  const [errorMessage, setErrorMessage] = React.useState(""); // State for error messages

  
  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setErrorMessage(""); // Clear previous errors
      const response = await fetch(`${LOGIN_ROUTE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const { user, token } = await response.json();
      
      // Dispatch login action to Redux store
      dispatch(setLogin({
        user,
        token,
      }));
      
      resetForm(); // Reset form fields
      navigate('/home'); // Navigate to home page
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "Invalid username or password"); // Set error message
      resetForm(); // Reset form fields
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto px-8 p-6 bg-white/85 backdrop-blur-sm md:bg-white rounded shadow"
          >
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}

            <div className="mb-6">
              <div className="font-nohemi text-3xl mb-4">
                Start Yapping
              </div>
              <Label htmlFor="username" className="block text-lg font-medium text-gray-700">
                Username
              </Label>
              <Field
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                className="mt-1 block w-full mb-8"
                as={Input}
              />
              <ErrorMessage name="username" component="div" className="text-red-500" />
            </div>

            <div className="mb-6">
              <Label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Password
              </Label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="mt-1 block w-full mb-8"
                as={Input}
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                type="submit" 
                className="w-full font-nohemi text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </motion.div>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;