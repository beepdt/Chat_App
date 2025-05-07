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
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

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
        
            <Card className="rounded-none border-[#1e1e1e] border-t-1 border-l-0 border-r-0 overflow-hidden bg-transparent hover:bg-[#1e1e1e] transition-all duration-300 ease-in-out -mr-2">
                <CardHeader className="border-b-2 border-[#1e1e1e] p-4 w-full">
                    <div className="flex items-center gap-3 w-full pl-2 ">
                        <BuddyTile 
                            friendId={postUserId}
                            name={`${username}`}
                            userPicturePath={userPicturePath}
                             // Assuming you have a way to determine if the user is verified
                        />
                    </div>
                        <div className=" rounded-none  pb-2 pl-4 pt-0 -mt-4">
                            <p className="mt-3 text-[#FFFAFA] font-general">{description}</p>
                        </div>
                        
                    
                </CardHeader>
                <CardFooter className="flex justify-between pt-0 pl-4 -mt-2">
                    <Button
                        onClick={patchLike} 
                        variant="ghost" size="sm" 
                        className="flex items-center gap-1 rounded-full bg-[#ff4911] ">
                        
                        <Heart className="h-4 w-4" /> {likeCount} likes
                    </Button>
                </CardFooter>
                
            </Card>
        
    );
}

export default YapWidget;