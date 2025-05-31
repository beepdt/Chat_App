import React, { use } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChannel, setFriends } from "@/state";
import { GET_FRIENDS_ROUTE } from "@/pages/HomePage/apiClient";
import { useEffect } from "react";
import UserProfileCard from "@/components/reusable/UserProfileCard";
import NewDm from "./NewDM";
import { setSelectedChatData, setSelectedChatType } from "@/state";
import { HOST } from "@/pages/HomePage/apiClient";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CreateChannel from "./CreateChannel";

const Contacts = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const channels = useSelector((state) => state.channels);

  const selectNewContact = (contact) => {
    dispatch(setSelectedChatType({ selectedChatType: "contact" }));
    dispatch(setSelectedChatData({ selectedChatData: contact }));
  };

  const selectNewChannel = (channel) => {
    dispatch(setSelectedChatType({ selectedChatType: "channel" }));
    dispatch(setSelectedChatData({ selectedChatData: channel }));
  };

  const getFriends = async () => {
    try {
      const response = await fetch(`${GET_FRIENDS_ROUTE}/${user._id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      console.log("data: ", data);
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getChannels = async () => {
    try {
      const response = await fetch(`${HOST}/channel/allChannels/${user._id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch channels");
      }

      console.log("Fetched channels:", data);
      // Optionally update state
      dispatch(setChannel({ channels: data }));
    } catch (e) {
      console.error("Error fetching channel:", e);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getChannels();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div
        className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] 
                          text-white w-full h-full border-2 border-[#1e1e1e] "
      >
        <UserProfileCard
          userId={user._id}
          picturePath={user.picturePath}
          name={user.name}
          onClick={() => navigate(`/profile/${user._id}`)}
        />
        <div className="flex items-center justify-between">
          <h2 className="font-nexus pl-4  text-[72px] text-[#ff4911]">
            Direct Messages
          </h2>
          <NewDm />
        </div>
        <div className="flex flex-col">
          {friends.map((friends) => (
            <div
              onClick={() => selectNewContact(friends)}
              key={friends._id}
              className="flex items-center justify-between p-2 border-b border-t border-[#1e1e1e] hover:bg-[#1e1e1e] cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 rounded-full bg-[#FFFAFA]">
                  <AvatarImage
                    src={
                      `${HOST}/assets/${friends.picturePath}` ||
                      friends.picturePath
                    }
                    className="rounded-full"
                  />
                </Avatar>

                <span>{`${friends.username}`}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <h2 className="font-nexus pl-4 pt-2 text-[72px] text-[#ff4911]">
            Groups
          </h2>
          <CreateChannel />
        </div>
        <div className="flex flex-col">
          {channels.map((channel) => (
            <div
              onClick={() => selectNewChannel(channel)}
              key={channel._id}
              className="flex items-center justify-between p-2 border-b border-t border-[#1e1e1e] hover:bg-[#1e1e1e] cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Placeholder avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white text-lg font-bold">
                  {channel.name.charAt(0).toUpperCase()}
                </div>

                <span>{channel.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Contacts;
//7:02
