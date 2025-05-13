import React, { use } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFriends } from "@/state";
import { GET_FRIENDS_ROUTE } from "@/pages/HomePage/apiClient";
import { useEffect } from "react";
import UserProfileCard from "@/components/reusable/UserProfileCard";
import NewDm from "./NewDM";

const Contacts = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

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

  useEffect(() => {
    getFriends();
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
        <div className="flex items-center justify-between">
          <h2 className="font-nexus pl-4 pt-2 text-[72px] text-[#ff4911]">
            Groups
          </h2>
        </div>
      </div>
    </>
  );
};
export default Contacts;
