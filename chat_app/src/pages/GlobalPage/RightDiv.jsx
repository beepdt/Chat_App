import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "@/state";
import { Button } from "@/components/ui/button";
import { HOST } from "../HomePage/apiClient";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BuddyTile from "@/components/reusable/BuddyTile";

const RightDiv = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [image, setImage] = useState(null);

  // Search state
  const [searchUser, setSearchUser] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Clear previous results when search text changes
  useEffect(() => {
    if (!searchUser.trim()) {
      setSearchResults([]);
    }
  }, [searchUser]);

  // Create a post
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

  // Search users by username
  const handleSearch = async () => {
    if (!searchUser.trim()) return;
    setIsSearching(true);
    setSearchError("");
    const url = `${HOST}/users/search?username=${encodeURIComponent(searchUser.trim())}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Server ${response.status}: ${errorBody}`);
      }
      const users = await response.json();
      setSearchResults(users);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchError(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full md:w-60 lg:w-full"
    >
      {/* Create Post Card */}
      <Card className="rounded-2xl shadow-l bg-[#FF9494] dark:bg-zinc-900 transition-colors border-transparent mb-4">
        <CardContent className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 font-nohemi">
            Create a Post
          </h1>
          <Input
            placeholder="What's on your mind?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="rounded-xl text-white text-base py-6 bg-[#222831] dark:bg-zinc-800"
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

      {/* Search Users Card */}
      <Card className="rounded-2xl shadow-l bg-[#FF9494] dark:bg-zinc-900 transition-colors border-transparent">
        <CardContent className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 font-nohemi">
            Search your Yapper
          </h1>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search user..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="flex-1 rounded-xl text-base py-2 bg-[#222831] text-white"
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching || !searchUser.trim()}
              className="self-end rounded-xl"
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* Results */}
          {isSearching && (
            <p className="text-center text-zinc-600 dark:text-zinc-400">Searching...</p>
          )}

          {!isSearching && searchUser.trim() && searchResults.length === 0 && (
            <p className="text-center text-zinc-600 dark:text-zinc-400">No users found.</p>
          )}

          {searchError && (
            <p className="text-red-500 text-center">{searchError}</p>
          )}
          {searchResults.length > 0 && (
            <div className="mt-4 space-y-2 h-auto overflow-auto">
              {searchResults.map((user) => (
                <BuddyTile
                  key={user._id}
                  friendId={user._id}
                  name={`${user.username}`}
                  userPicturePath={user.picturePath}
                  isVerified={user.isVerified}
                  onClick={() => navigate(`/profile/${user._id}`)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RightDiv;
