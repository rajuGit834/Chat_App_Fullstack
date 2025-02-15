import api from "./axiosInstance";

// Create a new group
export const createGroup = (
  name: string,
  members: string[],
  createdBy: string,
  profilePic: string,
) => {
  return api.post("/groups/create-group", { name, members, createdBy, profilePic });
};

//finding groups by userId
export const getAllGroups = (userId: any) => {
  return api.get(`/groups/${userId}`);
}