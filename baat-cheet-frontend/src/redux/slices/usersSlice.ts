import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { message } from "antd";
// import { send } from "process";

interface MessageType {
  msgId: string;
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
  // messages: MessageType[];
}

interface CurrentUser {
  _id: string;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  messages: MessageType[];
  selectedUser: string | null;
  getCurrentUser: CurrentUser | null;
  currentUserId: string | null;
}

const messages: MessageType[] = [
  {
    msgId: "1",
    sender: "67abaa4930a7deef3d2dc365",
    receiver: "67abb2bc3d6b758f6200081c",
    message: "Hey Supriya, how are you?",
    imageUrl: "",
    status: "delivered",
    // createdAt: "2025-02-12T08:00:00.000Z",
    // updatedAt: "2025-02-12T08:00:01.000Z",
  },
  {
    msgId: "2",
    sender: "67abb2bc3d6b758f6200081c",
    receiver: "67abaa4930a7deef3d2dc365",
    message: "Hi Raju! I'm good, how about you?",
    imageUrl: "",
    status: "seen",
    // createdAt: "2025-02-12T08:01:00.000Z",
    // updatedAt: "2025-02-12T08:01:30.000Z",
  },
  {
    msgId: "3",
    sender: "67abb2d03d6b758f62000820",
    receiver: "67abb82d9880ba7ee46b566d",
    message: "Hello! Did you complete the task?",
    imageUrl: "",
    status: "sent",
    // createdAt: "2025-02-12T08:05:00.000Z",
    // updatedAt: "2025-02-12T08:05:00.000Z",
  },
  {
    msgId: "4",
    sender: "67abb82d9880ba7ee46b566d",
    receiver: "67abb2d03d6b758f62000820",
    message: "Not yet, I'll finish it by evening.",
    imageUrl: "",
    status: "delivered",
    // createdAt: "2025-02-12T08:10:00.000Z",
    // updatedAt: "2025-02-12T08:10:05.000Z",
  },
  {
    msgId: "5",
    sender: "67ac4640e54d0fcbabc17c26",
    receiver: "67ac47cde54d0fcbabc17c41",
    message: "Hey XYZ, are you coming to the meeting?",
    imageUrl: "",
    status: "sent",
    // createdAt: "2025-02-12T08:15:00.000Z",
    // updatedAt: "2025-02-12T08:15:01.000Z",
  },
  {
    msgId: "6",
    sender: "67ac47cde54d0fcbabc17c41",
    receiver: "67ac4640e54d0fcbabc17c26",
    message: "Yes, I’ll be there in 10 minutes.",
    imageUrl: "",
    status: "seen",
    // createdAt: "2025-02-12T08:16:00.000Z",
    // updatedAt: "2025-02-12T08:16:30.000Z",
  },
  {
    msgId: "7",
    sender: "67ac48c1e54d0fcbabc17c4b",
    receiver: "67abaa4930a7deef3d2dc365",
    message: "Raju, can you send me the report?",
    imageUrl: "",
    status: "sent",
    // createdAt: "2025-02-12T08:20:00.000Z",
    // updatedAt: "2025-02-12T08:20:00.000Z",
  },
  {
    msgId: "8",
    sender: "67abaa4930a7deef3d2dc365",
    receiver: "67ac48c1e54d0fcbabc17c4b",
    message: "Sure, I'll send it in 5 minutes.",
    imageUrl: "",
    status: "delivered",
    // createdAt: "2025-02-12T08:22:00.000Z",
    // updatedAt: "2025-02-12T08:22:10.000Z",
  },
  {
    msgId: "9",
    sender: "67abb2bc3d6b758f6200081c",
    receiver: "67ac47cde54d0fcbabc17c41",
    message: "Hey XYZ, let's catch up later.",
    imageUrl: "",
    status: "seen",
    // createdAt: "2025-02-12T08:30:00.000Z",
    // updatedAt: "2025-02-12T08:30:05.000Z",
  },
  {
    msgId: "10",
    sender: "67ac47cde54d0fcbabc17c41",
    receiver: "67abb2bc3d6b758f6200081c",
    message: "Sure! Let's plan something.",
    imageUrl: "",
    status: "sent",
    // createdAt: "2025-02-12T08:31:00.000Z",
    // updatedAt: "2025-02-12T08:31:00.000Z",
  },
];

const currentUser: CurrentUser = {
  _id: "67abb2bc3d6b758f6200081c",
  name: "supriya kumari",
  email: "sksingh@g.com",
};

// Initial Redux state
const initialState: UserState = {
  users: [],
  messages: messages,
  selectedUser: null,
  getCurrentUser: currentUser,
  currentUserId: null,
};

// interface Message {
//   _id: string;
//   senderId: string;
//   receiverId: string;
//   message: string;
//   imagePath: string;
//   status: "sent" | "delivered" | "seen";
// }

// interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   isActive: boolean;
//   profilePic: string;
//   messages: Message[];
// }

// interface UserState {
//   users: User[];
//   selectedUser: string | null;
//   currentUser: string | null;
// }

// const initialState: UserState = {
//   users: [],
//   selectedUser: null,
//   currentUser: null,
// };

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
    },
    setCurrentUserId: (state, action: PayloadAction<string | null>) => {
      state.currentUserId = action.payload;
    },
    setMessage: (state, action: PayloadAction<MessageType[]>) => {
      console.log("calling my setUser slice");
      state.messages = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<{
        message: MessageType;
      }>
    ) => {
      const id = action.payload.message.msgId;
      const existingMsg = state.messages.find(
        (message) => message.msgId === id
      );

      if (!existingMsg) {
        state.messages.push(action.payload.message);
      }
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
} = userSlice.actions;
export default userSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import cat1 from "../../assets/cat1.webp";
// import cat2 from "../../assets/cat2.webp";
// import cat3 from "../../assets/cat3.webp";
// import cat4 from "../../assets/cat4.webp";

// // Define Message interface
// interface Message {
//   msgId: number;
//   type: "send" | "receive";
//   message: string;
//   imagePath: string;
// }

// // Define User interface
// interface User {
//   id: number;
//   name: string;
//   isActive: boolean;
//   profilePic: string;
//   messages: Message[];
// }

// // Dummy user data
// const initialUser: User[] = [
//   { id: 1, name: "Raju Kumar", isActive: true, profilePic: cat1, messages: [] },
//   {
//     id: 2,
//     name: "Abhishek Kumar",
//     isActive: false,
//     profilePic: cat2,
//     messages: [],
//   },
//   {
//     id: 3,
//     name: "Kamal Kumar",
//     isActive: true,
//     profilePic: cat3,
//     messages: [],
//   },
//   { id: 4, name: "Anand", isActive: false, profilePic: "", messages: [] },
//   {
//     id: 5,
//     name: "Deepak Kumar",
//     isActive: false,
//     profilePic: cat4,
//     messages: [],
//   },
//   {
//     id: 6,
//     name: "Supriya Kumari",
//     isActive: true,
//     profilePic: cat2,
//     messages: [],
//   },
// ];

// // Define UserState interface
// interface UserState {
//   users: User[];
//   selectedUser: number;
//   currentUser: string | null;
// }

// // Initial state
// const initialState: UserState = {
//   users: initialUser,
//   selectedUser: 1,
//   currentUser: null,
// };

// // Create slice
// const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//     setCurrentUser: (state, action: PayloadAction<string | null>) => {
//       state.currentUser = action.payload;
//     },
//     setSelectedUser: (state, action: PayloadAction<number>) => {
//       state.selectedUser = action.payload;
//     },
//     updateName: (
//       state,
//       action: PayloadAction<{ userId: number; userName: string }>
//     ) => {
//       const user = state.users.find(
//         (user) => user.id === action.payload.userId
//       );
//       if (user) user.name = action.payload.userName;
//     },
//     addMessage: (
//       state,
//       action: PayloadAction<{ userId: number; message: Message }>
//     ) => {
//       const user = state.users.find(
//         (user) => user.id === action.payload.userId
//       );
//       if (user) user.messages.push(action.payload.message);
//     },
//     updateMessage: (
//       state,
//       action: PayloadAction<{
//         userId: number;
//         messageId: number;
//         message: string;
//       }>
//     ) => {
//       const user = state.users.find(
//         (user) => user.id === action.payload.userId
//       );
//       if (user) {
//         const message = user.messages.find(
//           (msg) => msg.msgId === action.payload.messageId
//         );
//         if (message) message.message = action.payload.message;
//       }
//     },
//     deleteMessage: (
//       state,
//       action: PayloadAction<{ userId: number; messageId: number }>
//     ) => {
//       const user = state.users.find(
//         (user) => user.id === action.payload.userId
//       );
//       if (user) {
//         user.messages = user.messages.filter(
//           (msg) => msg.msgId !== action.payload.messageId
//         );
//       }
//     },
//   },
// });

// // Export actions
// export const {
//   setCurrentUser,
//   setSelectedUser,
//   addMessage,
//   updateName,
//   updateMessage,
//   deleteMessage,
// } = userSlice.actions;

// // Export reducer
// export default userSlice.reducer;
