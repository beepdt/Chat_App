import { Socket } from "socket.io";
import { Server } from "socket.io";

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

    socket.on("disconnect", () => cleanupSocket(socket));
  });
};

export default setupSocket;
