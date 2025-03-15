import { useState } from "react";
import { motion } from "framer-motion";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const otpSchema = yup.object().shape({
  otp: yup.string().length(6, "OTP must be 6 digits").required("OTP is required"),
});

const OTPForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setIsSubmitted(true);
    // Add your OTP verification logic here
    console.log("Submitted OTP:", values.otp);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ otp: "" }}
      validationSchema={otpSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8"
          >
            <Field name="otp">
              {({ field }) => (
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={(value) => setFieldValue("otp", value)}
                >
                  <InputOTPGroup className="gap-2">
                    {[...Array(6)].map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 1 }}
                        animate={{
                          scale: field.value[index] ? 1.1 : 1,
                          y: field.value[index] ? -5 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <InputOTPSlot
                          index={index}
                          className="h-14 w-14 text-xl border-1 border-gray-100 rounded-lg transition-colors shadow-lg"
                        />
                      </motion.div>
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            </Field>
            <ErrorMessage name="otp" component="div" className="text-red-500" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isSubmitted ? 0.5 : 1 }}
            >
              <Button
                type="submit"
                size="lg"
                className="px-8 py-4 text-xl font-nohemi"
                disabled={values.otp.length !== 6 || isSubmitting}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Verify OTP
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
};

export default OTPForm;