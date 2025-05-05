import { use, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "@/state";
import { Button } from "@/components/ui/button";
import YapWidget from "@/components/reusable/YapWidget";
import { HOST } from "@/pages/HomePage/apiClient";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";

const MiddleDiv = ({
    userId,
    isProfile = false
}) => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const { _id } = useSelector((state) => state.user);
    const userPicturePath = useSelector((state) => state.user.picturePath);
    const user = useSelector((state) => state.user);
    const [post, setPost] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    

    //create post
    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
          formData.append("picture", image);
          formData.append("picturePath", image.name);
        }
    
        const response = await fetch(`${HOST}/posts`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setPost("");
        setImage(null);
      };

    const getPosts = async () => {
        const response = await fetch(`${HOST}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log("All posts: ", data);
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(`${HOST}/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log("User posts: ", data);
        dispatch(setPosts({ posts: data }));
    };

    if(isProfile) {
        useEffect(() => {
            getUserPosts();
        }
        , []); // eslint-disable-line react-hooks/exhaustive-deps
    }
    else {
        useEffect(() => {
            getPosts();
        }
        , []); // eslint-disable-line react-hooks/exhaustive-deps
    }

    
    
   /* console.log("posts:", posts);
    console.log("  typeof:", typeof posts);
    console.log("  isArray:", Array.isArray(posts));
    console.log("  has iterator:", !!posts?.[Symbol.iterator]); */
    const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 

    return (
        <div className="space-y-4">

                <Card >
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Avatar>
                                <AvatarImage src={`${HOST}/assets/${userPicturePath}` || user?.picturePath} alt="Profile" className="rounded-full" />
                                </Avatar>
                                <Input
                                placeholder="What's on your mind?"
                                value={post}
                                onChange={(e) => setPost(e.target.value)}
                                className="rounded-full "
                                />
                            </div>
                            <Separator className="my-4" />         
                            <Button
                                
                                onClick={handlePost}
                                disabled={!post.trim()}
                                className="flex items-center gap-1 rounded-full"
                            >
                                Post
                            </Button>
                        </CardContent>
                </Card>

                {sortedPosts.map(
                    ({
                        _id,
                        userId,
                        username,
                        description,
                        likes,
                        userPicturePath,
                    }) => (
                        <YapWidget
                            key={_id}
                            postId={_id}
                            postUserId={userId}
                            username={username}
                            description={description}
                            likes={likes}
                            userPicturePath={userPicturePath}
                        />
                    )
                )}
            
        </div>
    )
}
export default MiddleDiv;