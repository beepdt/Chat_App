import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader,
} from "@/components/ui/drawer";
import UserProfileCard from "@/components/reusable/UserProfileCard";
import BuddyList from "@/components/reusable/BuddyList";
import MiddleDiv from "./MiddleDiv";
import RightDiv from "./RightDiv";
import { PlusIcon } from "lucide-react";
import TopBar from "@/components/reusable/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import LiquidBlobsBackground from "../SignPage/LiquidBlobsBackground";
import { motion } from "framer-motion";

const GlobalPage = () => {
  const navigate = useNavigate();
  const { _id = "", picturePath = "" } = useSelector((state) => state.user);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleNavigateHome = () => {
    navigate("/home");
  };

  return (
    <div className="overflow-y-auto scrollbar-thumb-blue-500 ">
     
      <div className="border-b-2 border-[#1e1e1e] absolute w-full  left-0">
        <motion.h1
          initial={{
            color: "#ff00f5",
            WebkitTextStroke: "0px #ff00f5",
            textStroke: "0px #ff00f5",
          }}
          whileHover={{
            color: "transparent",
            WebkitTextStroke: "2px #ff00f5",
            textStroke: "2px #ff00f5",
            transition: { duration: 0.2 },
          }}
          onClick={handleNavigateHome}
          className="font-nexus text-[120px] text-[#ff00f5] leading-none  cursor-pointer pl-8 lg:pl-84 block  "
        >
          Yapper.
        </motion.h1>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 py-6 bg-[#111111] mt-32">
        {/* Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 ">
          {/* Left Fixed Panel */}
          <div className="hidden lg:block lg:col-span-3 space-y-0 sticky top-6 ">
            <UserProfileCard userId={_id} picturePath={picturePath} />
            <BuddyList userId={_id} />
          </div>

          {/* Middle Scrollable Section */}
          <div className="col-span-1 lg:col-span-6 border-l-2 border-r-2 border-[#1e1e1e] pr-0 -mt-6">
            <ScrollArea className="h-full">
              <div className="space-y-0 pr-1 ">
                <MiddleDiv userId={_id} />
              </div>
            </ScrollArea>
          </div>

          {/* Right Fixed Panel */}
          <div className="hidden lg:block lg:col-span-3 space-y-4 sticky top-6  ">
            <RightDiv />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex-1">
          {/* Floating Action Button */}
          <Button
            onClick={() => setDrawerOpen(true)}
            className="fixed bottom-4 right-8 rounded-full p-3 size-14"
          >
            <PlusIcon className="size-8" />
          </Button>

          {/* Drawer */}
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            className="bg-[#111111]"
          >
            <DrawerContent
              side="left"
              className=" bottom-0 left-2 right-2  border-transparent p-4 shadow-lg bg-[#111111]"
            >
              <DrawerHeader>
                <DrawerTitle>
                  <UserProfileCard userId={_id} picturePath={picturePath} />
                </DrawerTitle>
                <DrawerDescription>
                  <BuddyList userId={_id} />
                </DrawerDescription>
                <DrawerClose />
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default GlobalPage;
