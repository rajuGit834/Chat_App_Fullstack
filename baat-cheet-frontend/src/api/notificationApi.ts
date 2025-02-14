import api from "./axiosInstance";

// Get all notifications for a user
export const getAllNotifications = (receiverId: string) => {
  return api.get(`/notification/${receiverId}`);
};
