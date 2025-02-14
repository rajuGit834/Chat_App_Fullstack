import api from "./axiosInstance";

// Send a message
export const sendMessage = (receiverId: string, text: string) => {
  return api.post("/message/", { receiverId, text });
};

// Get messages for a user
export const getMessages = (receiverId: string) => {
  return api.get(`/message/${receiverId}`);
};
