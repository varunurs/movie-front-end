import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import TicketsBookingForm from "./TicketsBookingForm";

export default function MovieDetails({ setSnackbarProps }) {
  const location = useLocation();
  const [ticketBookingFormOpen, setTicketBookingFormOpen] = useState(false);
  const { movie } = location.state;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleTicketBookingFormOpen = () => {
    setTicketBookingFormOpen(true);
  };

  const handleTicketBookingFormCLose = () => {
    setTicketBookingFormOpen(false);
  };

  return (
    <>
      <Navbar setSnackbarProps={setSnackbarProps} />

      <Box
        sx={{
          width: 700,
          height: "80vh",
          bgcolor: "background.paper",
          margin: "0 auto",
          my: 1,
          boxShadow: 24,
          overflow: "scroll",
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ flex: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {movie.name}
            </Typography>
            <Typography sx={{ my: 1 }}>Description:</Typography>
            <Typography sx={{ width: "70%", textAlign: "justify" }}>
              {movie.description}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, width: "200px", height: "200px" }}>
            <Box
              component="img"
              src={movie.imageUrl}
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ flex: 2 }}>
            <Typography>Language: {movie.language}</Typography>
            <Typography>Duration: {movie.duration}</Typography>
            <Typography>
              Playing Date: {new Date(`${movie.playingDate}Z`).toDateString()}
            </Typography>
            <Typography>
              Playing Time:{" "}
              {`${new Date(`${movie.playingTime}Z`).getHours()}:${new Date(
                `${movie.playingTime}Z`
              ).getMinutes()}`}
            </Typography>
            <Typography>Rating: {movie.rating}</Typography>
            <Typography>Ticket Price: {movie.ticketPrice}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "column",
              my: 2,
              flex: 1,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                const url = movie.trailerUrl;

                window.open(url, "_blank");
              }}
            >
              Watch Trailer
            </Button>
            {!isLoggedIn ? (
              <Typography>Login to Book Tickets</Typography>
            ) : (
              <Button
                variant="contained"
                fullWidth
                onClick={handleTicketBookingFormOpen}
                sx={{ my: 1 }}
              >
                Book Tickets
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
      <TicketsBookingForm
        open={ticketBookingFormOpen}
        handleClose={handleTicketBookingFormCLose}
        setSnackbarProps={setSnackbarProps}
        movie={movie}
      />
    </>
  );
}
