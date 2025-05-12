import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { setPost, setPosts } from "@/state/index";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { HOST } from "@/pages/HomePage/apiClient";
import BuddyTile from "./BuddyTile";
import { ThumbsUpIcon, ThumbsDownIcon, Heart, HeartIcon } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const YapWidget = ({
    postId,
    postUserId,
    username,
    description,
    likes,
    userPicturePath,
}) => {
    const navigate = useNavigate();

    const loggedInUserId = useSelector((state) => state.user._id);
    const dispatch = useDispatch();
    const isLiked = Boolean(likes[loggedInUserId]); // Check if the logged-in user has liked the post
    const likeCount = Object.keys(likes).length;
    const token = useSelector((state) => state.token);
    const [isAnimating, setIsAnimating] = useState(false); // State to control animation
    const [showParticle, setShowParticle] = useState(false); // State to control particle effect

    const patchLike = async () => {
        if (!isAnimating) {
            setIsAnimating(true);
            if (!isLiked) {
                setShowParticle(true); // Show particle effect when liking the post
                setTimeout(() => {
                    setShowParticle(false); // Hide particle effect after 0.5 seconds
                }, 600);
            } // Set animation state to true
        }
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

    const likeDigits = likeCount.toString().split("");

    return (
        <Card className="rounded-none border-[#1e1e1e] border-t-1 border-l-0 border-r-0 overflow-hidden bg-transparent hover:bg-[#1e1e1e] transition-all duration-300 ease-in-out -mr-2">
            <CardHeader className="border-b-2 border-[#1e1e1e] p-4 w-full">
                <div className="flex items-center gap-3 w-full pl-2 ">
                    <BuddyTile
                        friendId={postUserId}
                        name={`${username}`}
                        userPicturePath={userPicturePath}
                    />
                </div>
                <div className="rounded-none pb-2 pl-4 pt-0 -mt-4">
                    <p className="mt-3 text-[#FFFAFA] font-general">{description}</p>
                </div>
            </CardHeader>
            <CardFooter className="flex justify-between pt-0 pl-4 -mt-2">
                <motion.button
                    className="relative flex items-center justify-center rounded-full w-10 h-10 
                                hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
                    onClick={patchLike}
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.div
                        animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                    >
                        <Heart
                            size={24}
                            strokeWidth={isLiked ? 0 : 2}
                            className={`${
                                isLiked
                                    ? "fill-heart text-heart fill-[#ff4911]"
                                    : "fill-transparent text-[#ff4911] dark:text-gray-300"
                            } transition-colors`}
                        />
                    </motion.div>
                    <AnimatePresence>
                        {isLiked && isAnimating && (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: [0, 1.5, 0], opacity: [0, 0.4, 0] }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="w-full h-full rounded-full bg-heart/20" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {showParticle && (
                            <motion.div
                                className="absolute pointer-events-none"
                                initial={{ y: 0, opacity: 1 }}
                                animate={{ y: -40, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            >
                                <Heart
                                    size={24 * 0.6}
                                    className="fill-heart text-heart fill-[#ff4911]"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
                <div className="flex items-center gap-1 text-[#ff4911] ">
                    {likeDigits.map((digit, index) => (
                        <div
                            key={`${digit}-${index}-${likeCount}`}
                            className="relative h-5 w-[0.65rem]"
                        >
                            <AnimatePresence mode="popLayout">
                                <motion.h1
                                    key={`${likeCount}-${index}-${digit}`}
                                    initial={{ y: 20, opacity: 0, rotateX: -90 }}
                                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                    exit={{ y: -20, opacity: 0, rotateX: 90 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                    className="block font-nohemi text-[14px] text-[#ff4911] dark:text-gray-300 absolute"
                                >
                                    {likeCount}
                                </motion.h1>
                            </AnimatePresence>
                        </div>
                    ))}
                    <div className="items-center flex font-nohemi">likes</div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default YapWidget;
