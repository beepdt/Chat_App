import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/context/socketContext";
import { addMessageToChat } from "@/state";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { SendHorizontalIcon, StickerIcon } from "lucide-react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MessageBar = () => {
  const emojiRef = useRef();
  const [emojiPicker, setEmojiPicker] = useState(false);
  const dispatch = useDispatch();
  const socket = useSocket();
  const user = useSelector((state) => state.user);
  const chatType = useSelector((state) => state.selectedChatType);
  const chatData = useSelector((state) => state.selectedChatData);
  const chatMessages = useSelector((state) => state.selectedChatMessages);
  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      // Input validation
      if (!message.trim()) {
        console.warn("Cannot send empty message");
        return;
      }

      if (!user?._id || !chatData?._id) {
        console.error("Missing user or chat data");
        return;
      }

      // Socket validation
      if (!socket || !socket.connected) {
        console.error("Socket not connected");
        return;
      }

      if (chatType === "contact") {
        const messagePayload = {
          senderId: user._id,
          message: message.trim(), // Use 'content' instead of 'message'
          receiverId: chatData._id,
          messageType: "text",
          username: user.username,
        };

        // Emit to server
        socket.emit("sendMessage", messagePayload);

        // Optimistically update local state
        dispatch(
          addMessageToChat({
            ...messagePayload,
            _id: `temp-${Date.now()}`, // Temporary ID
            status: "sending",
          })
        );

        // Clear input
        setMessage("");
        console.log("Message sent", messagePayload);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="text-white height-[10vh]  flex justify-between items-center px-8 mb-[88px] gap-6 w-full lg:px-48">
      <div className="flex-1 flex items-center gap-5 pr-5">
        <Input
          className="flex-1  h-[48px] bg-black border-[#1e1e1e] border-1 rounded-xl focus:border-none focus:outline-none focus:ring-none  text-white placeholder:text-gray-200"
          placeholder="Type a message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="rounded-full flex items-center gap-2 bg-[#1e1e1e] p-2">
          <Button
            onClick={() => setEmojiPicker(!emojiPicker)}
            className="rounded-full ease-out-in duration-800 bg-[#111111] size-12 hover:bg-[#1e1e1e] hover:text-white ease-in-out duration-800 items-center justify-center"
          >
            <StickerIcon className="" />
          </Button>

          <Button
            onClick={handleSendMessage}
            disabled={!message}
            className="rounded-full text-black bg-[#ff4911] size-12 hover:bg-[#1e1e1e]  hover:text-white ease-in-out duration-800 items-center justify-center"
          >
            <SendHorizontalIcon />
          </Button>
        </div>
        <div className="absolute bottom-48 right-0" ref={emojiRef}>
          <EmojiPicker
            theme="dark"
            open={emojiPicker}
            onEmojiClick={handleAddEmoji}
            autoFocusSearch={false}
          />
        </div>
      </div>
    </div>
  );
};
export default MessageBar;
