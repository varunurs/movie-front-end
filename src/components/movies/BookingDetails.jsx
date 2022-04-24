import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper, Button } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

export default function BookingDetails() {
  const ticketDetails = useSelector((state) => state.tickets["$values"]);
  const movies = useSelector((state) => state.movies.movies);

  const tickets = [];

  //console.log(ticketDetails);

  ticketDetails.forEach((ticket) => {
    let movie = {};
    for (let mov in movies) {
      if (mov.id === ticket.MovieId) {
        console.log(mov);
        movie = mov;
        break;
      }
    }
    console.log({ ...ticket, Movie: { ...movie } });
    tickets.push({ ...ticket, Movie: { ...movie } });
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
              p: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              justifySelf: "center",
              height: "300px",
              width: "90%",
              cursor: "pointer",
            }}
            key={idx}
            elevation={5}
          >
            {/* <Box sx={{ flex: 1 }}>
              <Box sx={{ width: "100px", height: "100px" }}>
                <Box
                  component="img"
                  sx={{ width: "100%" }}
                  src={ticket.MovieDetails.imageUrl}
                />
              </Box>
            </Box> */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              {/* <Typography>Movie Name:{ticket.MovieDetails.name}</Typography> */}
              <Typography>Reservation Id :{ticket.Id}</Typography>
              <Typography>No of Tickets :{ticket.Qty}</Typography>
              <Typography>Total Price :{ticket.Price}</Typography>
              <Typography>
                Reservation Time :{ticket.ReservationTime}
              </Typography>
              {/* <Typography> Language:{ticket.MovieDetails.language}</Typography>
              <Typography> Language:{ticket.MovieDetails.duration}</Typography> */}

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
