import { HOST } from "@/pages/HomePage/apiClient";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addMessageToChat } from "@/state";
import { useState } from "react";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState(null);

  const dispatch = useDispatch();
  //const socket = useRef();
  const user = useSelector((state) => state.user);
  const chatData = useSelector((state) => state.selectedChatData);
  const chatType = useSelector((state) => state.selectedChatType);

  const handleReceivedMessage = (message) => {
    if (!chatType || !chatData?._id || !user?._id) return;

    const otherUserId = chatData._id;

    const isMessageForCurrentUser =
      message.senderId === otherUserId && message.receiverId === user._id;

    if (isMessageForCurrentUser) {
      console.log("message received", message);
      dispatch(addMessageToChat(message));
    }
  };
  const handleChannelMessage = (message) => {
    if (!chatType || !chatData?._id || !user?._id) return;
    const channelId = chatData._id;
    const isMessageForCurrentUser = channelId === message.channelId;
    if(isMessageForCurrentUser){
      console.log("message received", message);
      dispatch(addMessageToChat(message));
    }
  };
  useEffect(() => {
    if (user) {
      const newSocket = io(HOST, {
        withCredentials: true,
        query: { userId: user._id },
      });
      newSocket.on("connect", () => {
        console.log("Connected to server");
        setSocketInstance(newSocket);
      });

      newSocket.on("receivedMessage", handleReceivedMessage);
      newSocket.on("receiveChannelMessage", handleChannelMessage);

      return () => {
        newSocket?.disconnect();
        setSocketInstance(null);
      };
    }
  }, [user, chatData, chatType]);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};
