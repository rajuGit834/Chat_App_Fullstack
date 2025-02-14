import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:4005";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
});
