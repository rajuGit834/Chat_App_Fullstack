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
import groupMessageRoutes from "./routes/groupMessageRoutes";
import { updateStatusOfUser } from "./utils/handleUpdateStatus";
import Message from "./models/messageModel";
import Notification from "./models/notificationModel";
import GroupMessage from "./models/groupMessageModel";
import Group from "./models/groupModel";
import User from "./models/usersModel";

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

io.on("connection", (socket: any) => {
  // Store user socket ID when they connect
  socket.on("register", async (userId: any) => {
    try {
      users.set(userId, socket.id);
      updateStatusOfUser(userId, "online");

      const groups = await Group.find({ members: userId });

      if (!groups.length) {
        return;
      }

      groups.forEach((group) => {
        socket.join(group._id.toString());
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  });

  // Listen for Messages
  socket.on("message", async (data: any) => {
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
      const senderSocketId = users.get(sender);
      console.log(`Receiver Socket ID: ${receiverSocketId}`);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("message", newMessage);
      }
      io.to(senderSocketId).emit("message", newMessage);

      // socket.emit("message", newMessage);
    } catch (error) {
      console.error("Message save error:", error);
    }
  });

  socket.on("groupMessage", async (data: any) => {
    const { sender, group, message, imageUrl } = data;
    try {
      const newGroupMessage = new GroupMessage({
        sender,
        group,
        message,
        imageUrl,
      });

      await newGroupMessage.save();

      io.to(group).emit("groupMessage", newGroupMessage);
    } catch (error) {
      console.log("Group message save error:", error);
    }
  });

  socket.on("notification", async (data: any) => {
    try {
      if (data.messageType === "personal") {
        const {
          _id,
          sender,
          receiver,
          message,
          imageUrl,
          status,
          messageType,
        } = data;
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

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("notification", newNotification);
        }
      } else {
        const { _id, sender, group, message, imageUrl, status, messageType } =
          data;
        const newNotification = await Notification.findOneAndUpdate(
          { _id },
          { sender, receiver: group, message, imageUrl, status, messageType },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        io.to(group).emit("notification", newNotification);
      }
    } catch (error) {
      console.log("Notification save Error: ", error);
    }
  });

  socket.on("deleteNotification", async (data: any) => {
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

  //
  socket.on("send-request", async (data: any) => {
    try {
      const { sender, userId } = data;
      const user = await User.findById(userId);
      if (!user) {
        console.log("No user found with given id in send request event");
        return;
      }
      if (!user.friendRequest.includes(sender)) {
        user.friendRequest.push(sender);
      }

      await user.save();

      const socketId = users.get(userId);

      if (socketId) {
        io.to(socketId).emit("send-request", user);
      }
    } catch (error) {
      console.log("Sending request error: ", error);
    }
  });

  socket.on("response-on-request", async (data: any) => {
    try {
      const { name, status, receiver, sender } = data;
      await User.updateOne(
        { _id: sender },
        { $pull: { friendRequest: receiver } }
      );

      const updatedUser = await User.findById(sender);

      const receiverSocketId = users.get(receiver);
      const senderSocketId = users.get(sender);

      if (status === "confirm") {
        // adding contact in both user
        await User.updateOne(
          { _id: sender },
          { $addToSet: { contacts: receiver } }
        );

        await User.updateOne(
          { _id: receiver },
          { $addToSet: { contacts: sender } }
        );
      }

      if (receiverSocketId) {
        const updatedUser = await User.findById(receiver);
        io.to(receiverSocketId).emit("response-on-request", {
          from: "receiver",
          name,
          status,
          updatedUser,
        });
      }

      if (senderSocketId) {
        const updatedUser = await User.findById(sender);
        io.to(senderSocketId).emit("response-on-request", {
          from: "sender",
          updatedUser,
        });
      }
    } catch (error) {
      console.log("error in response request");
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
app.use("/api/groups/messages", groupMessageRoutes);

// Database Connection
connectDB();

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
