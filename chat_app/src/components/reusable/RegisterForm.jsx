import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

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
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto p-8 bg-white rounded shadow"
          >
            <div className="mb-4">
              <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </Label>
              <Field
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                className="mt-1 block w-full"
                as={Input}
              />
              <ErrorMessage name="username" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full"
                as={Input}
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="mt-1 block w-full"
                as={Input}
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <Label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                Profile Picture
              </Label>
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                accept="image/*"
                className="mt-1 block w-full"
                onChange={(event) => {
                  setFieldValue("profilePicture", event.currentTarget.files[0]);
                }}
                as={Input}
              />
              <ErrorMessage name="profilePicture" component="div" className="text-red-500" />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" className="w-full font-nohemi text-lg" disabled={isSubmitting}>
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
