import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import authSlice from "./authSlice";
import ticketsSlice from "./ticketsSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    auth: authSlice,
    tickets: ticketsSlice,
  },
});
