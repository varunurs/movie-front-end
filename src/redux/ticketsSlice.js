import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_RESERVATION_URL;

export const getTicketsAsync = createAsyncThunk(
  "tickets/getTickets",
  async (payload) => {
    const url = `${BASE_URL}/api/Reservation/${payload.userId}`;

    try {
      const res = await axios.get(url);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const bookTicketsAsync = createAsyncThunk(
  "tickets/bookTickets",
  async (payload, { rejectWithValue }) => {
    const url = `${BASE_URL}/api/Reservation`;

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
    deleteTicketById: (state, action) => {
      const tickets = state;
      const filteredTickets = tickets.filter(
        (ticket) => ticket.Id !== action.payload.Id
      );
      return filteredTickets;
    },
  },
  extraReducers: {
    [getTicketsAsync.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const { logOut } = ticketsSlice.actions;

export default ticketsSlice.reducer;
