import { useState } from 'react'; // Importing useState hook from React
import { Button } from '@/components/ui/button'; // Importing Button component
import LoginForm from '@/components/reusable/LoginForm'; // Importing LoginForm component
import RegisterForm from '@/components/reusable/RegisterForm'; // Importing RegisterForm component
import { motion } from 'framer-motion'; // Importing motion from framer-motion for animations
import OTPInput from '@/components/reusable/OTPInput'; // Importing OTPInput component
import SignImg from '../../assets/img/img1.jpg' // Importing image for the sign-in page
import { Label } from '@/components/ui/label'; // Importing Label component
import { Input } from '@/components/ui/input'; // Importing Input component

const SignPage = () => {
    const [pageType, setPageType] = useState('Login'); // State to toggle between Login and Register forms
    const [isOTP, setIsOTP] = useState(false); // State to toggle to OTP input

    const handleRegisterSubmit = (formData) => {
        // Assuming formData contains all the fields from the RegisterForm
        if (formData.email && formData.password && formData.confirmPassword) {
            setIsOTP(true); // Change to OTP input when all fields are filled
        }
    };

    return (
        <div className="flex max-w-full w-full h-screen mx-auto relative z-10 gap-4 p-4 md:py-8 md:pr-4 bg-black">
            {/* Image Container - Becomes background on mobile */}
            <div className="absolute inset-0 rounded-none overflow-hidden md:rounded-lg md:relative md:w-1/2 md:pl-4 z-0">
                <img 
                    src={SignImg} 
                    alt="Sign In" 
                    className="w-full h-full object-cover object-center rounded-none md:rounded-lg"
                />
            </div>
            
            {/* Form Container - Overlay on mobile */}
            <div className="w-full md:w-1/2 bg-transparent md:bg-white rounded-lg z-10 overflow-y-auto">
                <div className="text-6xl flex relative md:text-7xl px-4 md:px-8 font-bold mt-8 mb-8 md:mb-16 font-nohemi">
                    WELCOME TO YAPPER
                </div>
                <div className='w-fit mx-auto p-2 mb-8 bg-white rounded-full shadow-lg'>
                    <div className="flex relative">
                        <motion.div
                            className="absolute bg-gray-900 rounded-full w-1/2 inset-y-0"
                            animate={{ left: pageType === "Login" ? "0%" : "50%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                        {['Login', 'Register'].map((type) => (
                            <Button
                                key={type}
                                variant="ghost"
                                onClick={() => {
                                    setPageType(type);
                                    setIsOTP(false); // Reset OTP state when switching forms
                                }}
                                className={`relative z-10 py-2 w-24 ${
                                    pageType === type 
                                        ? 'text-gray-100 hover:text-gray-100 hover:bg-transparent' 
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-transparent'
                                }`}
                            >
                                {type === 'Login' ? 'Sign In' : 'Sign Up'}
                            </Button>
                        ))}
                    </div>
                </div>
                {isOTP ? (
                    <div className="flex flex-col items-center">
                        <Label htmlFor="otp" className="mb-2">Enter OTP</Label>
                        <OTPInput numInputs={6} separator={<span>-</span>} />
                    </div>
                ) : (
                    pageType === 'Login' ? (
                        <LoginForm />
                    ) : (
                        <RegisterForm onSubmit={handleRegisterSubmit} />
                    )
                )}
            </div>
        </div>
    );
}

export default SignPage;