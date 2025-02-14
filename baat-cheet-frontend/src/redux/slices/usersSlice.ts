import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

interface CurrentUser {
  _id: string;
  name: string;
  email: string;
}

interface Notification extends MessageType {
  messageId: string;
}

interface UserState {
  users: User[];
  messages: MessageType[];
  selectedUser: string | null;
  getCurrentUser: CurrentUser | null;
  currentUserId: string | null;
  notifications: Notification[];
}

const initialState: UserState = {
  users: [],
  messages: [],
  // allMessages: [],
  selectedUser: null,
  getCurrentUser: null,
  currentUserId: null,
  notifications: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addNewUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setCurrentUser: (state, action: PayloadAction<CurrentUser | null>) => {
      state.getCurrentUser = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<string | null>) => {
      state.selectedUser = action.payload;
      state.notifications = state.notifications.filter(
        (notification) => notification.sender !== action.payload
      );
    },
    setCurrentUserId: (state, action: PayloadAction<string | null>) => {
      state.currentUserId = action.payload;
    },
    setMessage: (state, action: PayloadAction<MessageType[]>) => {
      state.messages = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<{
        message: MessageType;
      }>
    ) => {
      state.messages.push(action.payload.message);
    },
    setNotification: (state, action: PayloadAction<Notification[]>) => {
      console.log("recv noti", action.payload);
      state.notifications = action.payload;
    },
    addNewNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.messageId !== action.payload.messageId
      );
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
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
  setSelectedUser,
  setCurrentUserId,
  addMessage,
  setMessage,
  setNotification,
  addNewNotification,
  removeNotification,
} = userSlice.actions;
export default userSlice.reducer;
