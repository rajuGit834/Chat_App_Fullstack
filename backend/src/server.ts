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
  },
});

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for Messages
  socket.on("message", async (data) => {
    const { senderId, receiverId, message, imagePath } = data;

    if (!senderId || !receiverId) {
      console.log("Error: senderId or receiverId missing");
      return;
    }

    try {
      // Save message to database
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
        imagePath,
        status: "sent",
      });

      await newMessage.save();

      // Emit saved message to receiver only (one-to-one chat)
      io.to(receiverId).emit("message", newMessage);
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
