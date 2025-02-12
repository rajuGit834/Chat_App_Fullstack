import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";
import Message from "./models/messageModel";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// WebSocket Connection

const users = new Map(); // ✅ Store connected users (socket.id mapping)

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // ✅ Store user socket ID when they connect
  socket.on("register", (userId) => {
    users.set(userId, socket.id);
    console.log(`User Registered: ${userId} -> ${socket.id}`); // ✅ Debugging
  });

  // ✅ Listen for Messages
  socket.on("message", async (data) => {
    const { sender, receiver, message, imageUrl } = data;

    if (!sender || !receiver) {
      console.log("Error: senderId or receiverId missing");
      return;
    }

    try {
      // ✅ Save message to database
      const newMessage = new Message({
        sender,
        receiver,
        message,
        imageUrl,
        status: "sent",
      });

      await newMessage.save();

      // ✅ Send message to receiver (one-to-one chat)
      const receiverSocketId = users.get(receiver);
      console.log(`Receiver Socket ID: ${receiverSocketId}`); // ✅ Debugging
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("message", newMessage);
      }

      // ✅ Also send back to sender (for UI update)
      socket.emit("message", newMessage);
    } catch (error) {
      console.error("Message save error:", error);
    }
  });

  // ✅ Remove user from Map on disconnect
  socket.on("disconnect", () => {
    users.forEach((value, key) => {
      if (value === socket.id) {
        users.delete(key);
        console.log(`User ${key} disconnected.`);
      }
    });

    console.log("User disconnected:", socket.id);
  });
});


// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("message", (data) => {
//     console.log("Message received:", data);
//     io.emit("message", data); // Send message to all clients
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for Messages
  socket.on("message", async (data) => {
    const { sender, receiver, message, imageUrl } = data;

    if (!sender || !receiver) {
      console.log("Error: senderId or receiverId missing");
      return;
    }

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

      // Emit saved message to receiver only (one-to-one chat)
      io.to(receiver).emit("message", data);
    } catch (error) {
      console.error("Message save error:", error);
    }
  });

  socket.on("disconnect", () => {
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

// Database Connection
connectDB();

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

// const express = require("express");
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db";
// import userRoutes from "./routes/userRoutes";
// import cookieParser from "cookie-parser";
// import { createServer } from "http";
// import { Server } from "socket.io";

// const app = express();
// dotenv.config();

// const server = createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("message", (data) => {
//     console.log("Message received:", data);
//     io.emit("message", data); // Broadcast to all clients
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use("/api/auth", userRoutes);

// const PORT = process.env.PORT || 3000;
// connectDB();

// server.listen(PORT, () =>
//   console.log(`Server is running on http://localhost:${PORT}`)
// );
