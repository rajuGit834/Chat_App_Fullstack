import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  messages: Message[];
}
const initialUser: User[] = [
  {
    id: 1,
    name: "raju kumar",
    isActive: true,
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
  },
});

export const { setSelectedUser, addMessage } = userSlice.actions;
export default userSlice.reducer;
