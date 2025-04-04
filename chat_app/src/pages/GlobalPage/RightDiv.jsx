import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { setPost, setPosts } from "@/state";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HOST } from "../HomePage/apiClient";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
const RightDiv = () => {
    const dispatch =  useDispatch();
    const [post, setPost] = useState("");
    const { _id } = useSelector((state) => state.user);
    const  token  = useSelector((state) => state.token);
    const [image, setImage] = useState(null);
    const [isImage, setIsImage] = useState(false);

    //create a post
    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch (`${HOST}/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setPost("");
        setImage(null);
    };

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full md:w-60 lg:w-full "
        >
            <Card className="rounded-2xl shadow-l  bg-white dark:bg-zinc-900 transition-colors">
                <CardContent className="flex flex-col space-y-4">
                    <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 font-nohemi">Create a Post</h1>
                    <Input
                        placeholder="What's on your mind?"
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        className="rounded-xl text-base py-6"
                    />
                    <Button
                        onClick={handlePost}
                        disabled={!post.trim()}
                        className="self-end rounded-xl"
                    >
                        Post
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    )

}

export default RightDiv;