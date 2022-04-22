import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const bookTicketsAsync = createAsyncThunk(
  "tickets/bookTickets",
  async (payload, { rejectWithValue }) => {
    const url = `${BASE_URL}/ReservationSvc`;

    try {
      await axios.post(url, {
        ...payload,
        Qty: parseInt(payload.Qty),
        Price: parseFloat(payload.Price),
      });

      return payload;
    } catch (error) {
      return rejectWithValue("Invalid Credentials!");
    }
  }
);

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState: [],
  reducers: {
    logOut: () => {
      return { isLoggedIn: false };
    },
  },
  extraReducers: {
    [bookTicketsAsync.fulfilled]: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { logOut } = ticketsSlice.actions;

export default ticketsSlice.reducer;
