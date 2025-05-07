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
      <Card className="overflow-hidden rounded-xl border-none  mt-0 pt-0 shadow-none bg-[#111111]">
          <div className="pt-0 ">
            <div className="flex items-center justify-between pt-0 pl-4 p-0">
              <h1 className="font-nexus text-[120px] -mt-6 text-[#ff4911]">Profile</h1>
            </div>
          </div>
          <CardContent className="p-0 -mt-14  rounded-lg pt-4 pb-4 hover:bg-[#1e1e1e] transition-all duration-300 ease-in-out">
            <div className="grid-pattern p-0 pl-4 ">
              <div className="flex items-center gap-4 ">
                <div className="relative">
                  <Avatar className="h-14 w-14 rounded-full bg-[#FFFAFA] shadow-xl">
                    <AvatarImage src={`${HOST}/assets/${picturePath}` || user?.picturePath} alt="Profile" className="rounded-full" />
                  </Avatar>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold font-nohemi text-2xl text-[#FFFAFA]" onClick={()=>navigate(`/profile/${userId}`)} >
                    <span className="text-sm text-[#ff4911]">@</span>{username || "Loading..."}
                  </h3>
                  <p className={`text-sm font-mono ${isVerified? 'text-green-600': 'text-red-800'}`}>{isVerified? "verified": "anonymous"}</p>
                </div>               
              </div>
            </div>      

          </CardContent>  
      </Card>
    </motion.div>
  );
};

export default UserProfileCard;
