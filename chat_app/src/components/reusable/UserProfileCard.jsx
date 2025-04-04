import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HOST } from "@/pages/HomePage/apiClient";

const UserProfileCard = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    try {
      console.log("Fetching user with ID:", userId);
      const response = await fetch(`${HOST}/users/${userId}`, 
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`},
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // Dependency on userId

  useEffect(() => {
    if (user) {
      console.log("Updated user data:", user);
    }
  }, [user]);

  const { username, email, isVerified} = user || {};

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bottom-4 right-4"
    >
      <Card className="w-full p-4 bg-white text-gray-900 rounded-2xl flex space-x-4 overflow-hidden justify-between shadow-lg dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
        <div className="flex items-center font-nohemi ml-8 ">
          <Avatar className="w-14 h-14">
            <AvatarImage src={`${HOST}/assets/${picturePath}` || user?.picturePath} alt="Profile" className="rounded-full" />
          </Avatar>
          <CardContent className="flex flex-col">
            <span className="text-xl  font-semibold">{username || "Loading..."}</span>
            
            <span className={`text-lg ${isVerified? 'text-green-600': 'text-red-600'}`}>{isVerified? "verified": "anonymous"}</span>
          </CardContent>
        </div>
        
      </Card>
    </motion.div>
  );
};

export default UserProfileCard;
