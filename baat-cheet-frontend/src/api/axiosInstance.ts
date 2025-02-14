import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // API Base URL from .env
  withCredentials: true, // To send cookies for authentication
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
