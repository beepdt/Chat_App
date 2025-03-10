import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "@/components/reusable/BottomNav";
import TopBar from "@/components/reusable/TopBar";
import OTPInput from "@/components/reusable/OTPInput";

const HomePage = () => {
  return (
    <div>
      <TopBar />
      <BottomNav />
      <OTPInput />
    </div>
  );
};

export default HomePage;
