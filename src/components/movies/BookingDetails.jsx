import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Paper, Button } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { getTicketsAsync } from "../../redux/ticketsSlice";
import { getMoviesAsync } from "../../redux/moviesSlice";

export default function BookingDetails() {
  const dispatch = useDispatch();
  const ticketDetails = useSelector((state) => state.tickets);
  const movies = useSelector((state) => state.movies.movies);
  const userId = useSelector((state) => state.auth.userId);

  const getMovie = (id) => {
    let movie = {};
    for (let mov in movies) {
      if (mov.id === id) {
        console.log(mov);
        movie = mov;
        break;
      }
    }
    return movie;
  };

  const tickets = [];

  ticketDetails.forEach((ticket) => {
    const MovieDetails = getMovie(ticket.MovieId);
    tickets.push({ ...ticket, MovieDetails });
  });

  useEffect(() => {
    dispatch(getTicketsAsync({ userId }));
    dispatch(getMoviesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Box sx={{ flex: 1 }}>
              <Box sx={{ width: "100px", height: "100px" }}>
                <Box
                  component="img"
                  sx={{ width: "100%" }}
                  src={ticket.MovieDetails.imageUrl}
                />
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Typography>Movie Name:{ticket.MovieDetails.name}</Typography>
              <Typography>Reserved for :{ticket.ReservationTime}</Typography>
              <Typography> Language:{ticket.MovieDetails.language}</Typography>
              <Typography> Language:{ticket.MovieDetails.duration}</Typography>

              <Button
                sx={{
                  backgroundColor: "primary.red",
                  color: "primary.white",
                  "&:hover": {
                    backgroundColor: "primary.red",
                    color: "primary.white",
                  },
                }}
                variant="contained"
              >
                Cancel Ticket
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
      <Footer />
    </>
  );
}
