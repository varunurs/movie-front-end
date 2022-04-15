import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios");

export const getMoviesAsync = createAsyncThunk(
  "movies/getMoviesAsync",
  async (payload) => {
    try {
      const deltaBucketsResponse = await axios.get(
        `https://localhost:8080/api/movies`,
        {
          headers: {
            "x-access-token": payload.token,
          },
        }
      );
      return deltaBucketsResponse.data;
    } catch (err) {
      throw err;
    }
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [
      {
        Id: 1,
        Name: "Justice league",
        Duration: "4h 2m",
        Language: "English",
        Rating: "8.6",
        Genre: "SF",
        ImageUrl:
          "https://irs.www.warnerbros.com/keyart-jpeg/movies/media/browser/justice_league_whv_keyart.jpg",
        TotalPages: "1",
      },
      {
        Id: 2,
        Name: "Raya",
        Duration: "1h 47m",
        Language: "English",
        Rating: "8.6",
        Genre: "Anime",
        ImageUrl:
          "https://lumiere-a.akamaihd.net/v1/images/p_rayaandthelastdragon_21294_83346778.jpeg",
        TotalPages: "1",
      },
      {
        Id: 3,
        Name: "Nobody",
        Duration: "1h 32m",
        Language: "English",
        Rating: "8.3",
        Genre: "Action",
        ImageUrl:
          "https://static.toiimg.com/thumb/msid-75554669,width-219,height-317,imgsize-28101/75554669.jpg",
        TotalPages: "1",
      },
    ],
  },
  reducers: {},
  extraReducers: {
    [getMoviesAsync.fulfilled]: (state, action) => {
      return { ...state, deltaBuckets: action.payload };
    },
  },
});

// export const {} = moviesSlice.actions;

export default moviesSlice.reducer;
