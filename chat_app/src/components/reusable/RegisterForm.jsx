import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { setLogin } from './../../state';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const savedUser = await response.json();
      resetForm();
      dispatch(setLogin({ user: savedUser }));
      navigate("/home");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto p-8 bg-white/85 backdrop-blur-sm md:bg-white rounded shadow"
          >
            <div className="mb-4">
              <div className="font-nohemi text-3xl mb-4">
                Become a Yapper
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <ErrorMessage name="username" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <Label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </Label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full mb-8"
                as={Input}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" className="w-full font-nohemi text-lg">
                Sign Up
              </Button>
            </motion.div>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;