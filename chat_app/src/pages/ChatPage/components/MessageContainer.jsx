import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import moment from "moment";
import { GET_MESSAGES_ROUTE } from "@/pages/HomePage/apiClient";
import { setSelectedChatMessages } from "@/state";

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

  useEffect(() => {
    getAllMessages();
  }, [chatData, chatType]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
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
