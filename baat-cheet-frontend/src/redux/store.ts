import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    users: userReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
