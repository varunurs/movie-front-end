import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios");
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getMoviesAsync = createAsyncThunk(
  "movies/getMoviesAsync",
  async (payload) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/Movies`, {
        // headers: {
        //   "x-access-token": payload.token,
        // },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
  },
  reducers: {},
  extraReducers: {
    [getMoviesAsync.fulfilled]: (state, action) => {
      return { ...state, movies: action.payload };
    },
  },
});

// export const {} = moviesSlice.actions;

export default moviesSlice.reducer;
