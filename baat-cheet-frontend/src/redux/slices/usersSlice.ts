import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cat1 from "../../assets/cat1.webp"
import cat2 from "../../assets/cat2.webp"
import cat3 from "../../assets/cat3.webp"
import cat4 from "../../assets/cat4.webp"

interface Message {
  msgId: number;
  type: "send" | "receive";
  message: string;
  imagePath: string;
}

interface User {
  id: number;
  name: string;
  isActive: boolean;
  profilePic: string;
  messages: Message[];
}

const initialUser: User[] = [
  {
    id: 1,
    name: "raju kumar",
    isActive: true,
    profilePic: cat1,
    messages: [
      {
        msgId: 1,
        type: "send",
        message: "hi",
        imagePath: "",
      },
      {
        msgId: 2,
        type: "receive",
        message: "hello",
        imagePath: "",
      },
      {
        msgId: 3,
        type: "send",
        message: "how are you?",
        imagePath: "",
      },
      {
        msgId: 4,
        type: "receive",
        message: "I am fine.",
        imagePath: "",
      },
      {
        msgId: 5,
        type: "send",
        message: "I am Raju",
        imagePath: "",
      },
      {
        msgId: 6,
        type: "send",
        message: "I am fine.",
        imagePath: "",
      },
      {
        msgId: 7,
        type: "send",
        message:
          "I am Rajunw dlvnewdvvjovjosvjonjovernjoverfoiovbroeokvbnrobrobvonornvboinorkvborvorovrnornbornvornvbojrnvrovborbnrnbvornivbrobnvronvornbvkrnor nvkrnbojr nvorjv nvbronbb ",
        imagePath: "",
      },
    ],
  },
  {
    id: 2,
    name: "abhishek kumar",
    isActive: false,
    profilePic: cat2,
    messages: [
      {
        msgId: 1,
        type: "send",
        message: "hi",
        imagePath: "",
      },
      {
        msgId: 2,
        type: "receive",
        message: "hello",
        imagePath: "",
      },
      {
        msgId: 3,
        type: "send",
        message: "how are you?",
        imagePath: "",
      },
      {
        msgId: 4,
        type: "receive",
        message: "I am fine.",
        imagePath: "",
      },
      {
        msgId: 5,
        type: "send",
        message: "I am Abhishek",
        imagePath: "",
      },
    ],
  },
  {
    id: 3,
    name: "kamal kumar",
    isActive: true,
    profilePic: cat3,
    messages: [
      {
        msgId: 1,
        type: "send",
        message: "hi",
        imagePath: "",
      },
      {
        msgId: 2,
        type: "receive",
        message: "hello",
        imagePath: "",
      },
      {
        msgId: 3,
        type: "send",
        message: "how are you?",
        imagePath: "",
      },
      {
        msgId: 4,
        type: "receive",
        message: "I am fine.",
        imagePath: "",
      },
      {
        msgId: 5,
        type: "send",
        message: "I am Kamal",
        imagePath: "",
      },
    ],
  },
  {
    id: 4,
    name: "anand",
    isActive: false,
    profilePic: "",
    messages: [
      {
        msgId: 1,
        type: "send",
        message: "hi",
        imagePath: "",
      },
      {
        msgId: 2,
        type: "receive",
        message: "hello",
        imagePath: "",
      },
      {
        msgId: 3,
        type: "send",
        message: "how are you?",
        imagePath: "",
      },
      {
        msgId: 4,
        type: "receive",
        message: "I am fine.",
        imagePath: "",
      },
      {
        msgId: 5,
        type: "send",
        message: "I am Anand",
        imagePath: "",
      },
    ],
  },
  {
    id: 5,
    name: "deepak kumar",
    isActive: false,
    profilePic: cat4,
    messages: [
      {
        msgId: 1,
        type: "send",
        message: "hi",
        imagePath: "",
      },
      {
        msgId: 2,
        type: "receive",
        message: "hello",
        imagePath: "",
      },
      {
        msgId: 3,
        type: "send",
        message: "how are you?",
        imagePath: "",
      },
      {
        msgId: 4,
        type: "receive",
        message: "I am fine.",
        imagePath: "",
      },
      {
        msgId: 5,
        type: "send",
        message: "I am Deepak",
        imagePath: "",
      },
    ],
  },
  {
    id: 6,
    name: "supriya kumari",
    isActive: true,
    profilePic: cat2,
    messages: [
      {
        msgId: 1,
        type: "send",
        message: "hi",
        imagePath: "",
      },
      {
        msgId: 2,
        type: "receive",
        message: "hello",
        imagePath: "",
      },
      {
        msgId: 3,
        type: "send",
        message: "how are you?",
        imagePath: "",
      },
      {
        msgId: 4,
        type: "receive",
        message: "I am fine.",
        imagePath: "",
      },
      {
        msgId: 5,
        type: "send",
        message: "I am Supriya",
        imagePath: "",
      },
    ],
  },
];

interface UserState {
  users: User[];
  selectedUser: number;
}

const initialState: UserState = {
  users: initialUser,
  selectedUser: 1,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<number>) => {
      state.selectedUser = action.payload;
    },
    updateName: (
      state,
      action: PayloadAction<{ userId: number; userName: string }>
    ) => {
      const user = state.users.find(
        (user) => user.id === action.payload.userId
      );
      if (user) {
        user.name = action.payload.userName;
      }
    },
    addMessage: (
      state,
      action: PayloadAction<{ userId: number; message: Message }>
    ) => {
      const user = state.users.find(
        (user) => user.id === action.payload.userId
      );
      if (user) {
        user.messages.push(action.payload.message);
      }
    },
    updateMessage: (
      state,
      action: PayloadAction<{
        userId: Number;
        messageId: number;
        message: string;
      }>
    ) => {
      const user = state.users.find(
        (user) => user.id === action.payload.userId
      );

      if (user) {
        user.messages = user.messages.map((msg) =>
          msg.msgId === action.payload.messageId
            ? { ...msg, message: action.payload.message }
            : msg
        );
      }
    },
    deleteMessage: (
      state,
      action: PayloadAction<{ userId: number; messageId: number }>
    ) => {
      const user = state.users.find(
        (user) => user.id === action.payload.userId
      );
      if (user) {
        user.messages = user.messages.filter(
          (message) => message.msgId !== action.payload.messageId
        );
      }
    },
  },
});

export const {
  setSelectedUser,
  addMessage,
  updateName,
  updateMessage,
  deleteMessage,
} = userSlice.actions;
export default userSlice.reducer;
