import { useState } from "react";
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
import MiddleDiv from "./../GlobalPage/MiddleDiv";
import RightDiv from "./../GlobalPage/RightDiv";
import { PlusIcon } from "lucide-react";
import TopBar from "@/components/reusable/TopBar";
import { useParams } from "react-router-dom";
import { HOST } from "../HomePage/apiClient";
import BottomNav from "@/components/reusable/BottomNav";


const ProfilePage = () => {
    const { _id = "", picturePath = "" } = useSelector((state) => state.user);
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getUser = async () => {
      try {
        console.log("Fetching user with ID:", userId);
        const response = await fetch(`${HOST}/users/${userId}`, 
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };


  return (
    <div className='bg-[#111111] h-screen flex flex-col'>
      <TopBar />
      {/* Desktop Layout */}
      <div className='hidden md:flex flex-1 overflow-hidden'>
        {/* Left Fixed Panel */}
        <div className='fixed left-0 top-20 bottom-0 w-[22%] min-w-[240px] max-w-[460px] overflow-y-auto p-4 z-10 pr-0'>
          <div className='space-y-4 pr-4'>
            <UserProfileCard userId={userId} picturePath={picturePath} />
            <BuddyList userId={userId} />
          </div>
        </div>

        {/* Middle Scrollable Section */}
        <div className='flex-1 overflow-y-auto scrollable mt-20 ml-[calc(22%+16px)] mr-[calc(22%+16px)]'>
          <div className='max-w-[640px] mx-auto p-4 space-y-2'>
            <MiddleDiv userId={userId} isProfile={true}/>
          </div>
        </div>

        {/* Right Fixed Panel */}
        <div className='fixed  right-0 top-20 bottom-0 w-[22%] min-w-[240px] max-w-[460px] overflow-y-auto p-4 z-10 pl-0'>
          <div className='space-y-4 pl-4'>
            <RightDiv />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex-1">
        <div className="p-2 mb-2 w-full mt-20 space-y-4">
          <MiddleDiv userId={userId} isProfile={true} />
        </div>

        {/* Floating Action Button */}
        <Button
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-4 right-8 rounded-full p-3 size-14"
        >
          <PlusIcon className="size-8" />
        </Button>

        {/* Drawer */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent className="fixed bottom-0 left-2 right-2 bg-black border-transparent p-4 shadow-lg">
            <DrawerHeader>
              <DrawerTitle>
                <UserProfileCard userId={userId} picturePath={picturePath} />
              </DrawerTitle>
              <DrawerDescription>
                <RightDiv />
              </DrawerDescription>
              <DrawerClose />
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
      
    </div>
  );
}

export default ProfilePage;