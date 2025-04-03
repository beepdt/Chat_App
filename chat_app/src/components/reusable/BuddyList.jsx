import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setFriends } from "@/state";
import BuddyTile from "./BuddyTile";

const BuddyList = ({userId}) => {
    const dispatch = useDispatch();
    const token = useSelector((state)=> state.token);
    const friends = useSelector((state)=> state.user.friends);

    const getFriends = async () => {
        try {
          const response = await fetch(`http://localhost:3000/users/friends/${userId}`, 
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

    return (
        <>
            <Card className="w-full p-2 bg-gray-100 text-gray-900 items-center rounded-2xl flex space-x-4 overflow-hidden">
                <span>Buddies</span>
                <CardContent>
                  {friends.map((friend)=>(
                    <BuddyTile
                      key={friend._id}
                      friendId={friend._id}
                      name={`${friend.username}`}
                    />
                  ))}
                </CardContent>
            </Card>
        </>
    )
};

export default BuddyList