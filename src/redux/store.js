import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import authSlice from "./authSlice";
import ticketsSlice from "./ticketsSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "movie",
  storage,
};

const reducers = combineReducers({
  movies: moviesSlice,
  auth: authSlice,
  tickets: ticketsSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
