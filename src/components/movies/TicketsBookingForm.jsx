import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bookTicketsAsync } from "../../redux/ticketsSlice";

export default function TicketsBookingForm(props) {
  const { open, handleClose, setSnackbarProps, movie } = props;
  const dispatch = useDispatch();
  const UserId = useSelector((state) => state.auth.userId);
  const playingDate = new Date(movie.playingDate).toLocaleDateString("hi-IN");
  const playingTime = new Date(movie.playingTime).toLocaleTimeString("hi-IN");
  const [ticketBookingFormValues, setTicketBookingFormValues] = useState({
    Qty: 1,
    Price: movie.ticketPrice,
    Phone: "",
    ReservationTime: `${playingDate} ${playingTime} `,
    MovieId: movie.id,
    UserId: UserId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "Qty")
      setTicketBookingFormValues({
        ...ticketBookingFormValues,
        [name]: value,
        Price: value * movie.ticketPrice,
      });
    else
      setTicketBookingFormValues({
        ...ticketBookingFormValues,
        [name]: value,
      });
  };

  const handleSubmit = async () => {
    await dispatch(bookTicketsAsync(ticketBookingFormValues))
      .unwrap()
      .then(() => {
        setSnackbarProps({
          open: true,
          severity: "success",
          msg: "Booked Tickets Successfully",
        });
        handleClose();
      })
      .catch(() => {
        setSnackbarProps({
          open: true,
          severity: "error",
          msg: "Failed to book Tickets, Try again!",
        });
        handleClose();
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Book Tickets</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", my: 1 }}>
          <TextField
            label="Mobile Number"
            name="Phone"
            value={ticketBookingFormValues.Phone}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mr: 1 }}
            size="small"
            type="number"
          />
          <TextField
            label="Number of Tickets"
            name="Qty"
            value={ticketBookingFormValues.Qty}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            type="number"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ my: 1 }}>Total Price: </Typography>
          <Typography sx={{ fontSize: "1.5em", mx: 1 }} component="span">
            {ticketBookingFormValues.Price}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          sx={{ backgroundColor: "primary.yellow" }}
          variant="contained"
        >
          Book Tickets
        </Button>
      </DialogActions>
    </Dialog>
  );
}
