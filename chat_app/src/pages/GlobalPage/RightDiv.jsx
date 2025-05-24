import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "@/state/index";
import { Button } from "@/components/ui/button";
import { HOST } from "../HomePage/apiClient";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BuddyTile from "@/components/reusable/BuddyTile";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-dropdown-menu";

const RightDiv = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const userPicturePath = useSelector((state) => state.user.picturePath);
  const user = useSelector((state) => state.user);

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
      
    >
      
      

      {/* Search Users Card */}
      <Card className="overflow-hidden border-none p-0 pt-0 rounded-xl bg-[ #111111] w-[400px]">
        <div className="pl-4">
            <h3 className="text-[100px] font-nexus -mt-2 text-[#ff4911]">Find Buddies</h3>
            <p className="text-[14px] font-nohemi -mt-6 text-[#ff4911]">Connect with yappers you may know</p>
        </div>
        <CardContent className="pt-0 pl-4  rounded-lg pt-4 pb-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 bg-[#FFFAFA rounded-full]">
              <Input
                placeholder="Search user..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="pr-8 bg-[#FFFAFA]"
              />
            </div>
            
            <Button
              onClick={handleSearch}
              disabled={isSearching || !searchUser.trim()}
              className= "rounded-full "
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* Results */}
          <div className="mt-4">
            {isSearching && (
              <div className="flex flex-col items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="mt-2 text-sm text-muted-foreground">Searching...</p>
              </div>
              
            )}
          </div>
          

          {!isSearching && searchUser.trim() && searchResults.length === 0 && (
            <p className="text-center text-zinc-600 dark:text-zinc-400">No users found.</p>
          )}

          {searchError && (
            <p className="text-red-500 text-center">{searchError}</p>
          )}
          {searchResults.length > 0 && (
            <div className="mt-2 space-y-2 p-0">
              <h4 className="text-sm font-nohemi text-[#ff4911]">Search Results</h4>
              <div className="overflow-auto rounded-md space-y-2 pr-2 pl-2 bg-[#1e1e1e] pt-4 pb-4 ">
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
              
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RightDiv;
