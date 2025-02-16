import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";
import notificationRouters from "./routes/notificationRoute";
import groupsRouter from "./routes/groupRoutes";
import { updateStatusOfUser } from "./utils/handleUpdateStatus";
import Message from "./models/messageModel";
import Notification from "./models/notificationModel";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_ORIGIN,
    credentials: true,
  },
});

// WebSocket Connection
const users = new Map(); // Store connected users
const activeChats = new Map(); //Store user chatting with

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Store user socket ID when they connect
  socket.on("register", async (userId) => {
    users.set(userId, socket.id);
    updateStatusOfUser(userId, "online");
  });

  // Listen for Messages
  socket.on("message", async (data) => {
    const { sender, receiver, message, imageUrl } = data;

    try {
      // Save message to database
      const newMessage = new Message({
        sender,
        receiver,
        message,
        imageUrl,
        status: "sent",
      });

      await newMessage.save();
      // Send message to receiver (one-to-one chat)
      const receiverSocketId = users.get(receiver);
      console.log(`Receiver Socket ID: ${receiverSocketId}`);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("message", newMessage);
      }

      socket.emit("message", newMessage);
    } catch (error) {
      console.error("Message save error:", error);
    }
  });

  socket.on("notification", async (data) => {
    try {
      const { _id, sender, receiver, message, imageUrl, status } = data;
      const receiverSocketId = users.get(receiver);

      if (activeChats.get(receiver) === sender) {
        return;
      }

      const messageId = new mongoose.Types.ObjectId(_id);

      const newNotification = await Notification.findOneAndUpdate(
        { messageId },
        { sender, receiver, message, imageUrl, status },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log("Notification saved or updated:");

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("notification", newNotification);
      }
    } catch (error) {
      console.log("Notification save Error: ", error);
    }
  });

  socket.on("deleteNotification", async (data) => {
    try {
      const { currentUser, selectedUser } = data;
      activeChats.set(currentUser, selectedUser);
      const receiverSocketId = users.get(currentUser);
      if (receiverSocketId) {
        await Notification.deleteMany({
          sender: selectedUser,
          receiver: currentUser,
        });
        io.to(receiverSocketId).emit("deleteNotification", selectedUser);
      }
    } catch (error) {
      console.log("Notification delete error: ", error);
    }
  });
  // Remove user from Map on disconnect
  socket.on("disconnect", () => {
    users.forEach((value, key) => {
      if (value === socket.id) {
        users.delete(key);
        updateStatusOfUser(key, "offline");
        console.log(`User ${key} disconnected.`);
      }
    });

    console.log("User disconnected:", socket.id);
  });
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/notification", notificationRouters);
app.use("/api/groups", groupsRouter);

// Database Connection
connectDB();

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
