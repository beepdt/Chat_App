import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setFriends } from "@/state";
import BuddyTile from "./BuddyTile";
import { HOST } from "@/pages/HomePage/apiClient";
import { GET_FRIENDS_ROUTE } from "@/pages/HomePage/apiClient";

const BuddyList = ({userId}) => {
    const dispatch = useDispatch();
    const token = useSelector((state)=> state.token);
    const friends = useSelector((state)=> state.user.friends);

    const getFriends = async () => {
        try {
          const response = await fetch(`${GET_FRIENDS_ROUTE}/${userId}`, 
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}`},
          });
          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }
          const data = await response.json();
          console.log("data: ", data)
          dispatch(setFriends({ friends: data}));
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
       useEffect(() => {
         getFriends()
        }, []);

        console.log("friends: ", friends)

    return (
        <>
            <Card className="rounded-xl shadow-none border-none pt-0 bg-transparent -mt-12 ">
              <CardHeader className="p-0 pl-4">
                <h3 className="font-nexus text-[100px] text-[#ff4911] p-0">Online Buddies</h3>
              </CardHeader>
                
                <CardContent className="space-y-4 p-4 -mt-12 rounded-lg ">
                  {friends.map((friend)=>(
                    <BuddyTile
                      key={friend._id}
                      friendId={friend._id}
                      name={`${friend.username}`}
                      userPicturePath={friend.picturePath}
                      isVerified={friend.isVerified}
                    />
                  ))}
                </CardContent>
            </Card>
        </>
    )
};

export default BuddyList