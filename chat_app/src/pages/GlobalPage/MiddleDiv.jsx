import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "@/state";
import { Button } from "@/components/ui/button";
import YapWidget from "@/components/reusable/YapWidget";
import { HOST } from "@/pages/HomePage/apiClient";

const MiddleDiv = ({
    userId,
    isProfile = false
}) => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    


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

    useEffect(() => {
        if(!token) return;
        if(isProfile) {
            getUserPosts();
        }
        else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    console.log("posts:", posts);
    console.log("  typeof:", typeof posts);
    console.log("  isArray:", Array.isArray(posts));
    console.log("  has iterator:", !!posts?.[Symbol.iterator]);
    const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 

    return (
        <>
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
            
        </>
    )
}
export default MiddleDiv;