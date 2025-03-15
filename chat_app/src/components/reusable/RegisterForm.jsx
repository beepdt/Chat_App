import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import OTPInput from "./OTPInput";

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

  const [formValues, setFormValues] = React.useState(initialValues);

  const [otp, setOtp] = React.useState(false);
  const [pageType, setPageType] = React.useState("Register");

  return (
    <>
    {pageType === "OTP" ? (
      <OTPInput />
    ) : ( 
      <Formik
      initialValues={formValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto p-8 bg-white/85 backdrop-blur-sm md:bg-white rounded shadow"
          >
            <div className="mb-4">
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
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>

            

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" className="w-full font-nohemi text-lg" onClick={() => setPageType("Register")}>
                Sign Up
              </Button>
            </motion.div>
          </motion.div>
        </Form>
      )}
    </Formik>
    )
    }
    </>
  );
};

export default RegisterForm;
