import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/reusable/LoginForm';
import RegisterForm from '@/components/reusable/RegisterForm';
import { motion } from 'framer-motion';

const SignPage = () => {
    const [pageType, setPageType] = useState('Login');

    return (
        <div className="max-w-md w-full bg-white rounded mx-auto py-8 relative z-10">
            <div className='w-fit mx-auto p-2 mb-8 bg-white rounded-full shadow-lg'>
                <div className="flex relative">
                    {/* Active Indicator */}
                    <motion.div
                        className="absolute bg-gray-900 rounded-full w-1/2 inset-y-0"
                        animate={{ left: pageType === "Login" ? "0%" : "50%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />

                    {/* Toggle Buttons */}
                    {['Login', 'Register'].map((type) => (
                        <Button
                            key={type}
                            variant="ghost"
                            onClick={() => setPageType(type)}
                            className={`relative z-10 py-2 w-24 ${
                                pageType === type 
                                    ? 'text-gray-100 hover:text-gray-100 hover:bg-transparent' 
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-transparent'
                            }`}
                        >
                            {type}
                        </Button>
                    ))}
                </div>
            </div>

            {pageType === 'Login' ? <LoginForm /> : <RegisterForm />}
        </div>
    );
}

export default SignPage;