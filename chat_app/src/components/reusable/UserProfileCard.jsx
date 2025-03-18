import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfileCard = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    try {
      console.log("Fetching user with ID:", userId);
      const response = await fetch(`http://localhost:3000/users/${userId}`, 
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
      initial={{ opacity: 0, x: 50, y: 50 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bottom-4 right-4"
    >
      <Card className="w-64 p-2 bg-gray-100 text-gray-900 items-center rounded-2xl shadow-lg flex space-x-4 overflow-hidden">
        <div className="flex items-center">
          <Avatar className="w-14 h-14">
            <AvatarImage src={`http://localhost:3000/assets/${picturePath}` || user?.picturePath} alt="Profile" className="rounded-full" />
          </Avatar>
          <CardContent className="flex flex-col">
            <span className="text-lg font-semibold">{username || "Loading..."}</span>
            <span className="text-sm text-gray-600">{email || "Fetching email..."}</span>
            <span className={`text-sm ${isVerified? 'text-green-600': 'text-red-600'}`}>{isVerified? "verified": "anonymous"}</span>
          </CardContent>
        </div>
        
      </Card>
    </motion.div>
  );
};

export default UserProfileCard;
