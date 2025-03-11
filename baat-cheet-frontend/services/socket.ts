import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_SOCKET_URL || "http://localhost:4005";
let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    console.log("Creating socket connection.");
    socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to server:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Disconnected: ${reason}`);
    });
  }
  return socket;
};
