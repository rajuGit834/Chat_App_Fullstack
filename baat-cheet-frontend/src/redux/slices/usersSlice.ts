// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

// const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//     setUsers: (state, action: PayloadAction<User[]>) => {
//       state.users = action.payload;
//     },
//     setCurrentUser: (state, action: PayloadAction<string | null>) => {
//       state.currentUser = action.payload;
//     },
//     setSelectedUser: (state, action: PayloadAction<string | null>) => {
//       state.selectedUser = action.payload;
//     },
//     addMessage: (
//       state,
//       action: PayloadAction<{ senderId: string; receiverId: string; message: Message }>
//     ) => {
//       const { senderId, receiverId, message } = action.payload;
//       const sender = state.users.find((user) => user._id === senderId);
//       const receiver = state.users.find((user) => user._id === receiverId);

//       if (sender) sender.messages.push(message);
//       if (receiver) receiver.messages.push(message);
//     },
//     updateMessage: (
//       state,
//       action: PayloadAction<{ userId: string; messageId: string; newMessage: string }>
//     ) => {
//       const user = state.users.find((user) => user._id === action.payload.userId);
//       if (user) {
//         const message = user.messages.find((msg) => msg._id === action.payload.messageId);
//         if (message) {
//           message.message = action.payload.newMessage;
//         }
//       }
//     },
//     deleteMessage: (
//       state,
//       action: PayloadAction<{ userId: string; messageId: string }>
//     ) => {
//       const user = state.users.find((user) => user._id === action.payload.userId);
//       if (user) {
//         user.messages = user.messages.filter((msg) => msg._id !== action.payload.messageId);
//       }
//     },
//     updateContactName: (
//       state,
//       action: PayloadAction<{ userId: string; firstName: string; lastName: string }>
//     ) => {
//       const user = state.users.find((user) => user._id === action.payload.userId);
//       if (user) {
//         user.firstName = action.payload.firstName;
//         user.lastName = action.payload.lastName;
//       }
//     },
//   },
// });

// export const { setUsers, setCurrentUser, setSelectedUser, addMessage, updateMessage, deleteMessage, updateContactName } = userSlice.actions;
// export default userSlice.reducer;



import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cat1 from "../../assets/cat1.webp";
import cat2 from "../../assets/cat2.webp";
import cat3 from "../../assets/cat3.webp";
import cat4 from "../../assets/cat4.webp";

// Define Message interface
interface Message {
  msgId: number;
  type: "send" | "receive";
  message: string;
  imagePath: string;
}

// Define User interface
interface User {
  id: number;
  name: string;
  isActive: boolean;
  profilePic: string;
  messages: Message[];
}

// Dummy user data
const initialUser: User[] = [
  { id: 1, name: "Raju Kumar", isActive: true, profilePic: cat1, messages: [] },
  { id: 2, name: "Abhishek Kumar", isActive: false, profilePic: cat2, messages: [] },
  { id: 3, name: "Kamal Kumar", isActive: true, profilePic: cat3, messages: [] },
  { id: 4, name: "Anand", isActive: false, profilePic: "", messages: [] },
  { id: 5, name: "Deepak Kumar", isActive: false, profilePic: cat4, messages: [] },
  { id: 6, name: "Supriya Kumari", isActive: true, profilePic: cat2, messages: [] },
];

// Define UserState interface
interface UserState {
  users: User[];
  selectedUser: number;
  currentUser: string | null;
}

// Initial state
const initialState: UserState = {
  users: initialUser,
  selectedUser: 1,
  currentUser: null,
};

// Create slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<string | null>) => {
      state.currentUser = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<number>) => {
      state.selectedUser = action.payload;
    },
    updateName: (state, action: PayloadAction<{ userId: number; userName: string }>) => {
      const user = state.users.find((user) => user.id === action.payload.userId);
      if (user) user.name = action.payload.userName;
    },
    addMessage: (state, action: PayloadAction<{ userId: number; message: Message }>) => {
      const user = state.users.find((user) => user.id === action.payload.userId);
      if (user) user.messages.push(action.payload.message);
    },
    updateMessage: (state, action: PayloadAction<{ userId: number; messageId: number; message: string }>) => {
      const user = state.users.find((user) => user.id === action.payload.userId);
      if (user) {
        const message = user.messages.find((msg) => msg.msgId === action.payload.messageId);
        if (message) message.message = action.payload.message;
      }
    },
    deleteMessage: (state, action: PayloadAction<{ userId: number; messageId: number }>) => {
      const user = state.users.find((user) => user.id === action.payload.userId);
      if (user) {
        user.messages = user.messages.filter((msg) => msg.msgId !== action.payload.messageId);
      }
    },
  },
});

// Export actions
export const { setCurrentUser, setSelectedUser, addMessage, updateName, updateMessage, deleteMessage } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
