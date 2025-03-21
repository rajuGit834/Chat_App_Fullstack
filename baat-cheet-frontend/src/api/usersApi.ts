import api from "./axiosInstance";

// Signup
export const signupUser = (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return api.post("/auth/signup", userData);
};

// Login
export const loginUser = (credentials: { email: string; password: string }) => {
  return api.post("/auth/login", credentials);
};

// Get all users (requires authentication)
export const getAllUsers = () => {
  return api.get("/auth/");
};

export const getUserById = (userId: any) => {
  return api.get(`/auth/${userId}`);
};

export const getContactOfUser = () => {
  return api.get("/auth/contacts");
};
