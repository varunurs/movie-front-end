import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Paper } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { getTicketsAsync } from "../../redux/ticketsSlice";
import { getMoviesAsync } from "../../redux/moviesSlice";

export default function BookingDetails() {
  const dispatch = useDispatch();
  const ticketDetails = useSelector((state) => state.tickets["$values"]);
  const movies = useSelector((state) => state.movies.movies);
  const userId = useSelector((state) => state.auth.userId);
  const tickets = [];

  const getMovie = (id) => {
    let movie = {};
    for (let mov in movies) {
      if (mov.id === id) {
        console.log(mov);
        movie = { ...mov };
        break;
      }
    }

    return movie;
  };

  useEffect(() => {
    dispatch(getTicketsAsync());
    dispatch(getMoviesAsync());
  }, []);

  ticketDetails.forEach((ticket) => {
    if (ticket.UserId === userId) {
      let result = {};
      const movieDetails = getMovie(ticket.MovieId);
      result = { ...ticket, movieDetails: movieDetails };
      tickets.push(result);
    }
  });

  // console.log(tickets);
  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "80vh",
          display: "grid",
          my: 1,
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {tickets.map((ticket, idx) => (
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              justifySelf: "center",
              height: "200px",
              width: "90%",
              cursor: "pointer",
            }}
            key={idx}
            elevation={5}
          >
            <Typography>Movie ID:{ticket.MovieId}</Typography>
          </Paper>
        ))}
      </Box>
      <Footer />
    </>
  );
}
