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
      
    >
      <Card className="pt-0">
        <div className="bg-gradient-to-r from-black to-gray-700 h-20 rounded-t-lg "/>
          <CardContent className="pt-0">
            <div className="flex items-center gap-3">
              <div className="relative -mt-20">
                <Avatar className="w-16 h-16 border-4 bg-white border-background">
                  <AvatarImage src={`${HOST}/assets/${picturePath}` || user?.picturePath} alt="Profile" className="rounded-full" />
                </Avatar>
              </div>
              <div className="flex-1 pt-2 pl-4 -mt-6">
                <h3 className="font-semibold font-nohemi text-2xl" onClick={()=>navigate(`/profile/${userId}`)} >
                   <span className="text-sm text-gray-400">@</span>{username || "Loading..."}
                </h3>
                <p className={`text-sm ${isVerified? 'text-green-600': 'text-red-800'}`}>{isVerified? "verified": "anonymous"}</p>
              </div>
            </div>      

          </CardContent>  
      </Card>
    </motion.div>
  );
};

export default UserProfileCard;
