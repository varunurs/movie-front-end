import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import usersSlice from "./usersSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    users: usersSlice,
  },
});
