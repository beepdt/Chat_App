import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function OTPInput() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = () => {
    console.log("Entered OTP:", otp.join(""));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4 p-6 bg-white shadow-lg rounded-2xl w-80"
    >
      <h2 className="text-xl font-semibold">Enter OTP</h2>
      <div className="flex gap-2">
        {otp.map((digit, index) => (
          <motion.div
            key={index}
            whileFocus={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Input
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              placeholder="•"
              className="w-10 h-10 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          </motion.div>
        ))}
      </div>
      <Button type="button" onClick={handleSubmit}>Submit</Button>
      <p className="text-sm text-blue-500 cursor-pointer hover:underline">Request OTP Again</p>
    </motion.div>
  );
}