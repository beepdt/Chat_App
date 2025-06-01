import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import moment from "moment";
import { GET_MESSAGES_ROUTE } from "@/pages/HomePage/apiClient";
import { setSelectedChatMessages } from "@/state";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HOST } from "@/pages/HomePage/apiClient";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const chatData = useSelector((state) => state.selectedChatData);
  const chatType = useSelector((state) => state.selectedChatType);
  const chatMessage = useSelector((state) => state.selectedChatMessages);
  const scrollRef = useRef();

  const getAllMessages = async () => {
    if (!user?._id || !chatData?._id) {
      throw new Error("User or chat ID is missing");
    }
    try {
      const response = await fetch(
        `${GET_MESSAGES_ROUTE}/${user._id}/${chatData._id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      console.log("data: ", data);
      dispatch(setSelectedChatMessages({ selectedChatMessages: data }));
    } catch (e) {
      console.error("Error fetching user:", e);
    }
  };
  const getAllChannelMessages = async () => {
    try {
      const response = await fetch(
        `${HOST}/channel/allMessages/${chatData._id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      console.log("data: ", data);
      dispatch(
        setSelectedChatMessages({ selectedChatMessages: data.messages })
      );
    } catch (e) {
      console.error("Error fetching user:", e);
    }
  };

  useEffect(() => {
    if (!chatData || !chatType) return;

    dispatch(setSelectedChatMessages({ selectedChatMessages: [] }));

    if (chatType === "contact") {
      getAllMessages();
    } else if (chatType === "channel") {
      getAllChannelMessages();
    }
  }, [chatData, chatType]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessage]);

  const dmMessage = (message) => {
    const isCurrentUser = message.senderId === chatData._id;

    return (
      <div
        className={`flex ${
          isCurrentUser ? "justify-start" : "justify-end"
        } mb-4 px-4 group`}
      >
        <div className="max-w-xs sm:max-w-sm">
          <div
            className={`${
              isCurrentUser
                ? "bg-[#E5E5EA] text-black rounded-[18px] rounded-bl-[4px] lg:text-[16px]"
                : "bg-[#ff00f5] text-black rounded-[18px] rounded-br-[4px] lg:text-[16px]"
            } px-4 py-2 font-generalmed text-[16px] leading-[22px] break-words`}
          >
            {message.message}
          </div>
          <div
            className={`text-[11px] text-gray-500 mt-1 px-2 ${
              isCurrentUser ? "text-right" : "text-left"
            }`}
          >
            {moment(message.createdAt).format("LT")}
          </div>
        </div>
      </div>
    );
  };

  const channelMessage = (message) => {
    const isCurrentUser = message.senderId._id === user._id;

    return (
      <div
        className={`flex ${
          isCurrentUser ? "justify-end" : "justify-start"
        } mb-6 px-4 group`}
      >
        <div
          className={`flex items-start gap-3 max-w-xs sm:max-w-md ${
            isCurrentUser ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Avatar */}
          <div className="flex-shrink-0 items-center justify-center">
            <Avatar className="w-8 h-8 border-2 border-white bg-white shadow-sm">
              <AvatarImage
                src={`${HOST}/assets/${message.senderId.picturePath}`}
                alt={message.senderId.username}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs font-semibold">
                {message.senderId.username?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <span>{message.senderId.username}</span>
          </div>

          {/* Message Content */}
          <div className="flex flex-col min-w-0 flex-1">
            {/* Username (only show for others' messages) */}
            {!isCurrentUser && (
              <div className="text-xs font-medium text-gray-600 mb-1 px-1">
                {message.senderId.username}
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`relative px-4 py-3 font-generalmed text-[15px] leading-[20px] break-words shadow-sm transition-all duration-200 group-hover:shadow-md ${
                isCurrentUser
                  ? "bg-gradient-to-r from-[#ff00f5] to-[#e600d9] text-white rounded-[20px] rounded-br-[6px]"
                  : "bg-white text-gray-800 rounded-[20px] rounded-bl-[6px] border border-gray-100"
              }`}
            >
              {message.message}

              {/* Message tail */}
            </div>

            {/* Timestamp */}
            <div
              className={`text-[11px] text-gray-400 mt-2 px-1 flex items-center gap-1 ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <span>{moment(message.createdAt).format("LT")}</span>
              {isCurrentUser && (
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full opacity-60"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full opacity-60"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const allMessages = () => {
    let lastDate = null;
    return chatMessage.map((message, index) => {
      const messageDate = moment(message.createdAt).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={message._id || message.id || index}>
          {showDate && (
            <div className="flex justify-center my-6">
              <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full shadow-sm">
                {moment(message.createdAt).format("LL")}
              </div>
            </div>
          )}
          {chatType === "contact" && dmMessage(message)}
          {chatType === "channel" && channelMessage(message)}
        </div>
      );
    });
  };
  return (
    <div className="text-white flex-1 overlow-y-auto p-4 px-8 scrollable md:w-[65vw] lg:w-[70vw]  w-full">
      {allMessages()}
      <div ref={scrollRef} />
    </div>
  );
};
export default MessageContainer;
