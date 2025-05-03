import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector,useDispatch } from "react-redux";
import { setPost, setPosts } from "@/state";
import {Card, CardContent } from "@/components/ui/card";
import { HOST } from "@/pages/HomePage/apiClient";
import BuddyTile from "./BuddyTile";
import { ThumbsUpIcon, ThumbsDownIcon } from "lucide-react";

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
        <Card className="rounded-2xl shadow-l  bg-[#202020] border-transparent w-full md:w-80 lg:w-150 sm:w-full">
            <CardContent className="flex flex-col space-y-4">
                <BuddyTile friendId={postUserId} name={username} userPicturePath={userPicturePath} />
                <p className="text-base text-gray-100 dark:text-zinc-400 border-transparent min-h-14 rounded-xl p-4 justify-center item-center">{description}</p>
                <Button
                    onClick={patchLike}
                    className={`rounded-xl ${isLiked ? 'bg-[#FF9494]' : 'bg-gray-300'}`}
                >
                    {isLiked ? (<ThumbsUpIcon className="w-5 text-black"/>) : (<ThumbsUpIcon className="w-5 text-black"/>)} 
                    <span className="text-sm text-black dark:text-zinc-400">
                        {likeCount}
                    </span>
                </Button>
                
            </CardContent>
        </Card>
    );
}

export default YapWidget;