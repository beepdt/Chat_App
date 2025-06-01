import { Socket } from "socket.io";
import { Server } from "socket.io";
import Message from "./models/messages.js";
import Channel from "./models/channel.js";

const setupSocket = (server, app) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.ORIGIN],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  app.set("io", io);
  const userSocketMap = new Map();

  //send message
  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.senderId);
    const receiverSocketId = userSocketMap.get(message.receiverId);

    const createdMessage = await Message.create(message);

    const messageData = await Message.findById(createdMessage._id)
      .populate("senderId", "_id username email")
      .populate("receiverId", "_id username email");

    const cleanMessageData = {
      _id: messageData._id,
      senderId: messageData.senderId._id, // Extract ID from populated object
      receiverId: messageData.receiverId._id, // Extract ID from populated object
      senderUsername: messageData.senderId.username, // Keep useful data
      receiverUsername: messageData.receiverId.username,
      message: messageData.message,
      messageType: messageData.messageType,
      createdAt: messageData.createdAt,
      updatedAt: messageData.updatedAt,
    };

    console.log("Sending clean message data:", cleanMessageData);

    console.log("message sent");
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receivedMessage", cleanMessageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("senderMessage", cleanMessageData);
    }
  };

  const ChannelMessage = async (content) => {
    try {
      const { senderId, channelId, message, messageType, username } = content;

      // Input validation
      if (!senderId || !channelId || !message?.trim()) {
        throw new Error(
          "Missing required fields: senderId, channelId, or message"
        );
      }

      // Create the message in database
      const createdMessage = await Message.create({
        senderId: senderId,
        receiverId: null,
        message: message.trim(),
        messageType: messageType || "text",
        username,
      });

      // Populate sender information
      const messageData = await Message.findById(createdMessage._id).populate(
        "senderId",
        "_id username email picturePath"
      );

      // Clean message data for emission
      const cleanMessageData = {
        _id: messageData._id,
        senderId: messageData.senderId._id, // Extract ID from populated object
        senderUsername: messageData.senderId.username, // Keep useful data
        message: messageData.message,
        messageType: messageData.messageType,
        createdAt: messageData.createdAt,
        updatedAt: messageData.updatedAt,
      };

      console.log("Sending channel message:", cleanMessageData);

      // Update channel's last activity
      await Channel.findByIdAndUpdate(channelId, {
        $push: { messages: createdMessage._id },
      });

      const channel = await Channel.findById(channelId).populate("members admin");
      const finalData = { ...messageData._doc, channelId: channel._id };

      

      if (channel && channel.members) {
        channel.members.forEach((member) => {
          const memberSocketId = userSocketMap.get(member._id.toString());
          if (memberSocketId) {
            io.to(memberSocketId).emit("receiveChannelMessage", finalData);
          }
        });
        const adminSocketId = userSocketMap.get(channel.admin._id.toString());
          if (adminSocketId) {
            io.to(adminSocketId).emit("receiveChannelMessage", finalData);
          }
      }
    } catch (error) {
      console.error("Error sending channel message:", error);
    }
  };

  //on disconnect
  const cleanupSocket = (socket) => {
    if (socket.userId) {
      userSocketMap.delete(socket.userId);
      console.log(`User disconnected (by userId): ${socket.userId}`);
    } else {
      // Fallback: find userId by socket.id
      for (const [userId, sid] of userSocketMap.entries()) {
        if (sid === socket.id) {
          userSocketMap.delete(userId);
          console.log(`User disconnected (by socket.id): ${userId}`);
          break;
        }
      }
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      socket.userId = userId;
      console.log(`User connection: ${userId} with socketId: ${socket.id}`);
    } else {
      console.log("No user Id");
    }

    socket.on("sendMessage", sendMessage);
    socket.on("sendChannelMessage", ChannelMessage);

    socket.on("disconnect", () => cleanupSocket(socket));
  });
};

export default setupSocket;
