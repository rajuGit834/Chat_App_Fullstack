import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./slices/usersSlice";
import groupReducer from "./slices/groupSlice";

const store = configureStore({
  reducer: {
    users: userReducers,
    groups: groupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
