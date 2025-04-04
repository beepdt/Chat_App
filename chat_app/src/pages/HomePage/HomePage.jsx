import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import BottomNav from "@/components/reusable/BottomNav";
import TopBar from "@/components/reusable/TopBar";
import OTPInput from "@/components/reusable/OTPInput";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserProfileCard from "@/components/reusable/UserProfileCard";
import ChatPage from "../ChatPage";
import GlobalPage from "../GlobalPage";

const HomePage = () => {
  const {_id="", picturePath=""} = useSelector((state)=>state.user);
  const [page, setPageType] = useState("home")

  return (
    <div >
      <TopBar/>
      
      {(page === "chat" ? <ChatPage/> : <GlobalPage/>)}      
      <BottomNav activePage={page} setPageType={setPageType}/>      
    </div>
  );
};

export default HomePage;
