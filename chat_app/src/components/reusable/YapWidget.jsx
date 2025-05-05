import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector,useDispatch } from "react-redux";
import { setPost, setPosts } from "@/state";
import {Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { HOST } from "@/pages/HomePage/apiClient";
import BuddyTile from "./BuddyTile";
import { ThumbsUpIcon, ThumbsDownIcon, Heart, HeartIcon } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "../ui/avatar";

const YapWidget = (
    {
        postId,
        postUserId,
        username,
        description,
        likes,
        userPicturePath,
    }
) => {

    const loggedInUserId = useSelector((state) => state.user._id); 
    const dispatch = useDispatch();
    const isLiked = Boolean(likes[loggedInUserId]); // Check if the logged-in user has liked the post
    const likeCount = Object.keys(likes).length;
    const token = useSelector((state) => state.token);
    

   

    const patchLike = async () => {
        const response = await fetch(`${HOST}/posts/${postId}/like`, {
            method: "PATCH",
            headers: { 
                Authorization: `Bearer ${token}`,
            
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }), // Send the logged-in user's ID in the request body
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    return (
        
            <Card >
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                        <Avatar className="rounded-full bg-gray-100 w-12 h-12">
                            <AvatarImage src={`${HOST}/assets/${userPicturePath}` || user?.picturePath} alt="Profile" className="rounded-full" />
                        </Avatar>
                        <div className="w-full bg-gradient-to-r from-black to-gray-700 rounded-xl p-2 text-white">
                            <BuddyTile
                                friendId={postUserId}
                                name={username}
                                
                             />  
                        </div>
                        </div>
                        <div className="border-2 rounded-xl pl-4 pb-2 pr-2 mt-4">
                            <p className="mt-3">{description}</p>
                        </div>
                        
                    
                </CardHeader>
                <CardFooter className="flex justify-between pt-0 pl-8 -mt-2">
                    <Button
                        onClick={patchLike} 
                        variant="ghost" size="sm" 
                        className="flex items-center gap-1 rounded-full  w-14">
                        
                        <Heart className="h-4 w-4" /> {likeCount} likes
                    </Button>
                </CardFooter>
                
            </Card>
        
    );
}

export default YapWidget;