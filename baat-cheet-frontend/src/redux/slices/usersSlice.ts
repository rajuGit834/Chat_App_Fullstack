import { createSlice } from "@reduxjs/toolkit";

interface MessageType {
  _id: string;
  sender?: string;
  receiver?: string;
  message?: string;
  imageUrl?: string;
  status: "sent" | "delivered" | "seen";
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  status: "online" | "offline";
  friendRequest: any;
}

interface CurrentUser {
  _id: string;
  name: string;
  email: string;
}

interface Notification extends MessageType {
  messageId: string;
  messageType: "group" | "personal";
}

interface UserState {
  users: User[];
  messages: any;
  selectedUser: string | null;
  getCurrentUser: CurrentUser | null;
  currentUserId: string | null;
  notifications: Notification[];
}

const initialState: UserState = {
  users: [],
  messages: [],
  selectedUser: null,
  getCurrentUser: null,
  currentUserId: null,
  notifications: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUser: (state, action) => {
      const users = state.users.filter(
        (user) => user._id !== action.payload._id
      );
      state.users = [...users, action.payload];
    },
    addNewUser: (state, action) => {
      state.users.push(action.payload);
    },
    setCurrentUser: (state, action) => {
      state.getCurrentUser = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.notifications = state.notifications.filter(
        (notification) => notification.sender !== action.payload
      );
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
    setMessage: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload.message);
    },
    setNotification: (state, action) => {
      state.notifications = action.payload;
    },
    addNewNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.messageId !== action.payload.messageId
      );
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.sender !== action.payload
      );
    },
  },
});

export const {
  setUsers,
  addNewUser,
  setCurrentUser,
  updateUser,
  setSelectedUser,
  setCurrentUserId,
  addMessage,
  setMessage,
  setNotification,
  addNewNotification,
  removeNotification,
} = userSlice.actions;
export default userSlice.reducer;
