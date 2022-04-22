import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_URL = process.env.REACT_APP_AUTH_URL;

export const loginUserAsync = createAsyncThunk(
  "auth/loginUserAsync",
  async (payload, { rejectWithValue }) => {
    const url = `${AUTH_URL}/api/Users/Login`;

    try {
      const response = await axios.post(url, {
        email: payload.email,
        password: payload.password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Invalid Credentials!");
    }
  }
);

export const registerUserAsync = createAsyncThunk(
  "auth/registerUserAsync",
  async (payload, { rejectWithValue }) => {
    const url = `${AUTH_URL}/api/Users/Register`;

    try {
      const response = await axios.post(url, {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue("Invalid Credentials!");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    isAdmin: false,
    userId: null,
  },
  reducers: {
    logOut: () => {
      return { isLoggedIn: false };
    },
  },
  extraReducers: {
    [loginUserAsync.fulfilled]: (state, action) => {
      const { token, role, id } = action.payload;

      return {
        ...state,
        token: token,
        isLoggedIn: true,
        isAdmin: role === "admin" ? true : false,
        userId: id,
      };
    },
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
