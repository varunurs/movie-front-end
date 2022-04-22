import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import usersSlice from "./usersSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    users: usersSlice,
    auth: authSlice,
  },
});
