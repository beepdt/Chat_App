import ChatHeader from "@/components/reusable/ChatHeader";
import MessageBar from "./MessagBar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";

const ChatContainer = () => {
  const chatUser = useSelector((state) => state.selectedChatData);
  console.log(chatUser);
  const { username, _id, picturePath } = chatUser || {};

  return (
    <>
      <div className="fixed h-[100vh]  lg:w-[78vw] flex flex-col p-2 border-2 border-[#1e1e1e]">
        <ChatHeader username={username} picturePath={picturePath} id={_id}/>
        <MessageContainer />
        <MessageBar />
      </div>
    </>
  );
};
export default ChatContainer;
