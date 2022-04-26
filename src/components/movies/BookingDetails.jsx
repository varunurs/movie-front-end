import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Paper, Button } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { deleteTicketById } from "../../redux/ticketsSlice";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_RESERVATION_URL;

export default function BookingDetails({ setSnackbarProps }) {
  const ticketDetails = useSelector((state) => state.tickets["$values"]);
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();
  const tickets = [];

  const handleCancelTicket = (id) => {
    axios.delete(`${BASE_URL}/api/Reservation/${id}`);
    console.log(id);
    setSnackbarProps({
      open: true,
      severity: "success",
      msg: "Tickets cancelled Successfully",
    });
    dispatch(deleteTicketById({ Id: id }));
  };

  ticketDetails.forEach((ticket) => {
    let movie = {};
    for (let mov in movies) {
      if (mov.id === ticket.MovieId) {
        console.log(mov);
        movie = mov;
        break;
      }
    }

    tickets.push({ ...ticket, Movie: { ...movie } });
  });

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "80vh",
          display: "grid",
          my: 1,
          gridTemplateColumns: "1fr 1fr 1fr",
          overflow: "scroll",
        }}
      >
        {tickets.map((ticket, idx) => (
          <Paper
            sx={{
              p: 1,
              my: 1,
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
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Typography>Reservation Id :{ticket.Id}</Typography>
              <Typography>No of Tickets :{ticket.Qty}</Typography>
              <Typography>Total Price :{ticket.Price}</Typography>
              <Typography>
                Reservation Time :{ticket.ReservationTime}
              </Typography>

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
                onClick={() => handleCancelTicket(ticket.Id)}
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
