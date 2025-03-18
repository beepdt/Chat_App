import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import BottomNav from "@/components/reusable/BottomNav";
import TopBar from "@/components/reusable/TopBar";
import OTPInput from "@/components/reusable/OTPInput";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserProfileCard from "@/components/reusable/UserProfileCard";

const HomePage = () => {
  const {_id="", picturePath=""} = useSelector((state)=>state.user);

  return (
    <div>
      <TopBar />     
      <UserProfileCard userId={_id} picturePath={picturePath}/>  
      <BottomNav />
      
    </div>
  );
};

export default HomePage;
