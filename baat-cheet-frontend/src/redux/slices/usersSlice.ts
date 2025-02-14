import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";

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
  // allMessages: MessageType[];
  selectedUser: string | null;
  getCurrentUser: CurrentUser | null;
  currentUserId: string | null;
  notifications: Notification[];
}

// const messages: MessageType[] = [
//   {
//     msgId: "1",
//     sender: "67abaa4930a7deef3d2dc365",
//     receiver: "67abb2bc3d6b758f6200081c",
//     message: "Hey Supriya, how are you?",
//     imageUrl: "",
//     status: "delivered",
//     // createdAt: "2025-02-12T08:00:00.000Z",
//     // updatedAt: "2025-02-12T08:00:01.000Z",
//   },
//   {
//     msgId: "2",
//     sender: "67abb2bc3d6b758f6200081c",
//     receiver: "67abaa4930a7deef3d2dc365",
//     message: "Hi Raju! I'm good, how about you?",
//     imageUrl: "",
//     status: "seen",
//     // createdAt: "2025-02-12T08:01:00.000Z",
//     // updatedAt: "2025-02-12T08:01:30.000Z",
//   },
//   {
//     msgId: "3",
//     sender: "67abb2d03d6b758f62000820",
//     receiver: "67abb82d9880ba7ee46b566d",
//     message: "Hello! Did you complete the task?",
//     imageUrl: "",
//     status: "sent",
//     // createdAt: "2025-02-12T08:05:00.000Z",
//     // updatedAt: "2025-02-12T08:05:00.000Z",
//   },
//   {
//     msgId: "4",
//     sender: "67abb82d9880ba7ee46b566d",
//     receiver: "67abb2d03d6b758f62000820",
//     message: "Not yet, I'll finish it by evening.",
//     imageUrl: "",
//     status: "delivered",
//     // createdAt: "2025-02-12T08:10:00.000Z",
//     // updatedAt: "2025-02-12T08:10:05.000Z",
//   },
//   {
//     msgId: "5",
//     sender: "67ac4640e54d0fcbabc17c26",
//     receiver: "67ac47cde54d0fcbabc17c41",
//     message: "Hey XYZ, are you coming to the meeting?",
//     imageUrl: "",
//     status: "sent",
//     // createdAt: "2025-02-12T08:15:00.000Z",
//     // updatedAt: "2025-02-12T08:15:01.000Z",
//   },
//   {
//     msgId: "6",
//     sender: "67ac47cde54d0fcbabc17c41",
//     receiver: "67ac4640e54d0fcbabc17c26",
//     message: "Yes, I’ll be there in 10 minutes.",
//     imageUrl: "",
//     status: "seen",
//     // createdAt: "2025-02-12T08:16:00.000Z",
//     // updatedAt: "2025-02-12T08:16:30.000Z",
//   },
//   {
//     msgId: "7",
//     sender: "67ac48c1e54d0fcbabc17c4b",
//     receiver: "67abaa4930a7deef3d2dc365",
//     message: "Raju, can you send me the report?",
//     imageUrl: "",
//     status: "sent",
//     // createdAt: "2025-02-12T08:20:00.000Z",
//     // updatedAt: "2025-02-12T08:20:00.000Z",
//   },
//   {
//     msgId: "8",
//     sender: "67abaa4930a7deef3d2dc365",
//     receiver: "67ac48c1e54d0fcbabc17c4b",
//     message: "Sure, I'll send it in 5 minutes.",
//     imageUrl: "",
//     status: "delivered",
//     // createdAt: "2025-02-12T08:22:00.000Z",
//     // updatedAt: "2025-02-12T08:22:10.000Z",
//   },
//   {
//     msgId: "9",
//     sender: "67abb2bc3d6b758f6200081c",
//     receiver: "67ac47cde54d0fcbabc17c41",
//     message: "Hey XYZ, let's catch up later.",
//     imageUrl: "",
//     status: "seen",
//     // createdAt: "2025-02-12T08:30:00.000Z",
//     // updatedAt: "2025-02-12T08:30:05.000Z",
//   },
//   {
//     msgId: "10",
//     sender: "67ac47cde54d0fcbabc17c41",
//     receiver: "67abb2bc3d6b758f6200081c",
//     message: "Sure! Let's plan something.",
//     imageUrl: "",
//     status: "sent",
//     // createdAt: "2025-02-12T08:31:00.000Z",
//     // updatedAt: "2025-02-12T08:31:00.000Z",
//   },
// ];

// Initial Redux state
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
    // selAllMessages: (state, action: PayloadAction<MessageType[]>) => {
    //   state.allMessages = action.payload;
    // },
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
    //   updateMessage: (
    //     state,
    //     action: PayloadAction<{
    //       userId: string;
    //       messageId: string;
    //       newMessage: string;
    //     }>
    //   ) => {
    //     const user = state.users.find(
    //       (user) => user._id === action.payload.userId
    //     );
    //     if (user) {
    //       const message = user.messages.find(
    //         (msg) => msg._id === action.payload.messageId
    //       );
    //       if (message) {
    //         message.message = action.payload.newMessage;
    //       }
    //     }
    //   },
    //   deleteMessage: (
    //     state,
    //     action: PayloadAction<{ userId: string; messageId: string }>
    //   ) => {
    //     const user = state.users.find(
    //       (user) => user._id === action.payload.userId
    //     );
    //     if (user) {
    //       user.messages = user.messages.filter(
    //         (msg) => msg._id !== action.payload.messageId
    //       );
    //     }
    //   },
    //   updateContactName: (
    //     state,
    //     action: PayloadAction<{
    //       userId: string;
    //       firstName: string;
    //       lastName: string;
    //     }>
    //   ) => {
    //     const user = state.users.find(
    //       (user) => user._id === action.payload.userId
    //     );
    //     if (user) {
    //       user.firstName = action.payload.firstName;
    //       user.lastName = action.payload.lastName;
    //     }
    //   },
  },
});

export const {
  setUsers,
  setCurrentUser,
  setSelectedUser,
  setCurrentUserId,
  addMessage,
  setMessage,
  // selAllMessages,
  setNotification,
  addNewNotification,
  removeNotification,
} = userSlice.actions;
export default userSlice.reducer;
