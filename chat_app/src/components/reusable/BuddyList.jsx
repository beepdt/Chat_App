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
            <Card >
              <CardHeader className="pb-3">
                <h3 className="font-nohemi text-2xl">Online Buddies</h3>
              </CardHeader>
                
                <CardContent className="space-y-4 ">
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