import api from "./axiosInstance";

export const getGroupMessageById = (groupId: string) => {
  return api.get(`/groups/messages/${groupId}`);
};
