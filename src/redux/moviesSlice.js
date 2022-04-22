import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios");
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getMoviesAsync = createAsyncThunk(
  "movies/getMoviesAsync",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/MovieSvc`, {
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
export const addMoviesAsync = createAsyncThunk(
  "movies/addMoviesAsync",
  async (payload) => {
    try {
      const data = {
        ...payload,
        rating: parseFloat(payload.rating),
        ticketPrice: parseFloat(payload.ticketPrice),
        playingDate: payload.playingDate.toISOString(),
        playingTime: payload.playingTime.toISOString(),
      };

      const res = await axios.post(`${BASE_URL}/MovieSvc`, data, {
        // headers: {
        //   "x-access-token": payload.token,
        // },
      });
      return {
        id: res.data,
        ...data,
        playingDate: data.playingDate.replace("Z", "").trim(),
        playingTime: data.playingTime.replace("Z", "").trim(),
      };
    } catch (err) {
      throw err;
    }
  }
);
export const updateMoviesAsync = createAsyncThunk(
  "movies/updateMoviesAsync",
  async (payload) => {
    try {
      const data = {
        ...payload,
        rating: parseFloat(payload.rating),
        ticketPrice: parseFloat(payload.ticketPrice),
        playingDate: payload.playingDate.toISOString(),
        playingTime: payload.playingTime.toISOString(),
      };

      await axios.put(`${BASE_URL}/MovieSvc/${payload.id}`, data, {
        // headers: {
        //   "x-access-token": payload.token,
        // },
      });
      return {
        ...data,
        playingDate: data.playingDate.replace("Z", "").trim(),
        playingTime: data.playingTime.replace("Z", "").trim(),
      };
    } catch (err) {
      throw err;
    }
  }
);
export const deleteMoviesAsync = createAsyncThunk(
  "movies/deleteMoviesAsync",
  async (payload) => {
    try {
      await axios.delete(
        `${BASE_URL}/MovieSvc/${payload.id}`,
        {},
        {
          // headers: {
          //   "x-access-token": payload.token,
          // },
        }
      );
      return payload;
    } catch (err) {
      throw err;
    }
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [
      // {
      //   id: 3,
      //   name: "KGF Chapter 2",
      //   description: "gold mining",
      //   language: "kannada",
      //   duration: "2:30 hrs",
      //   playingDate: "2022-05-01T00:00:00",
      //   playingTime: "2022-04-19T10:00:00",
      //   ticketPrice: 1000,
      //   rating: 8.5,
      //   genre: "crime",
      //   trailerUrl: "https://youtu.be/JKa05nyUmuQ",
      //   imageUrl:
      //     "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kgf-chapter-2-et00098647-08-04-2022-11-33-32.jpg",
      // },
      // {
      //   id: 4,
      //   name: "Avengers Multiverse",
      //   description:
      //     "The Multiverse is the aggregate of all dimensions and parallel realities in existence. Although dimensions are just portions of reality within a universe",
      //   language: "Englisg",
      //   duration: "2:00 hrs",
      //   playingDate: "2022-05-06T10:00:00.297",
      //   playingTime: "2022-04-19T10:00:00.297",
      //   ticketPrice: 500,
      //   rating: 9,
      //   genre: "Adventure",
      //   trailerUrl: "https://youtu.be/aWzlQ2N6qqg",
      //   imageUrl:
      //     "https://terrigen-cdn-dev.marvel.com/content/prod/1x/marvel-multiverse-rpg_playtest-rulebook-cover_opt.jpg",
      // },
      // {
      //   id: 15,
      //   name: "Thor love and thunder",
      //   description:
      //     "Thor: Love and Thunder is an upcoming American superhero film based on the Marvel Comics character Thor, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is intended to be the direct sequel to Thor: Ragnarok and the 29th film in the Marvel Cinematic Universe.",
      //   language: "English",
      //   duration: "2:00 hrs",
      //   playingDate: "2022-04-20T03:09:29.437",
      //   playingTime: "2022-04-20T03:09:29.437",
      //   ticketPrice: 1000,
      //   rating: 10,
      //   genre: "Adventure/Action",
      //   trailerUrl: "https://youtu.be/uO6Mq2Um8Zc",
      //   imageUrl:
      //     "https://upload.wikimedia.org/wikipedia/en/8/88/Thor_Love_and_Thunder_poster.jpeg",
      // },
    ],
  },
  reducers: {},
  extraReducers: {
    [getMoviesAsync.fulfilled]: (state, action) => {
      return { ...state, movies: action.payload };
    },
    [addMoviesAsync.fulfilled]: (state, action) => {
      return { ...state, movies: [...state.movies, action.payload] };
    },
    [updateMoviesAsync.fulfilled]: (state, action) => {
      const movies = [...state.movies];
      const movieIndex = movies.findIndex(
        (movie) => movie.id === action.payload.id
      );

      if (movieIndex > -1) {
        movies[movieIndex] = action.payload;
      }
      return { ...state, movies: movies };
    },
    [deleteMoviesAsync.fulfilled]: (state, action) => {
      const filteredMovies = state.movies.filter((movie) => {
        console.log(movie.id);
        return movie.id !== action.payload.id;
      });
      return { ...state, movies: filteredMovies };
    },
  },
});

// export const {} = moviesSlice.actions;

export default moviesSlice.reducer;
