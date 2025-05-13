import {
  ArrowLeft,
  ArrowLeftCircle,
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { setCloseChat } from "@/state";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import { HOST } from "@/pages/HomePage/apiClient";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ username, picturePath,id }) => {

    const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setCloseChat());
  };
  return (
    <div className="h-[10vh] border-b-2 border-[#1e1e1e] flex items-center justify-between -ml-2 -mr-2">
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center pl-8">
            <ArrowLeftIcon 
            onClick={() => handleClose()}
            className="size-12 fill-arrow text-[#ff4911]  hover:text-white hover:cursor-pointer transition duration-300" />
          
        </div>
        <div className="flex items-center justify-center gap-5 space-x-4">
          <Avatar className="h-14 w-14 rounded-full bg-[#FFFAFA]">
            <AvatarImage
              src={`${HOST}/assets/${picturePath}` || user?.picturePath}
            />
          </Avatar>
          <h1 
          onClick={() => navigate(`/profile/${id}`)}
          className="font-nohemi text-[24px] lg:text-[32px] text-[#ff4911] hover:text-white hover:cursor-pointer transition duration-300">
            {username}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
