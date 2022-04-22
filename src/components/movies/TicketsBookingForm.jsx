import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addMoviesAsync, updateMoviesAsync } from "../../redux/moviesSlice";

export default function TicketsBookingForm(props) {
  const {
    open,
    handleClose,
    isEditing,
    ticketBookingFormValues,
    setMovieFormValues,
    setSnackbarProps,
  } = props;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieFormValues({ ...ticketBookingFormValues, [name]: value });
  };

  const handleSubmit = async () => {
    // if (isEditing) {
    //   await dispatch(updateMoviesAsync(movieFormValues))
    //     .unwrap()
    //     .then(() => {
    //       setSnackbarProps({
    //         open: true,
    //         severity: "success",
    //         msg: "Movie Updated Successfully",
    //       });
    //       handleClose();
    //     })
    //     .catch(() => {
    //       setSnackbarProps({
    //         open: true,
    //         severity: "error",
    //         msg: "Failed to update movie, Try again!",
    //       });
    //       handleClose();
    //     });
    // } else {
    //   await dispatch(addMoviesAsync(movieFormValues))
    //     .unwrap()
    //     .then(() => {
    //       setSnackbarProps({
    //         open: true,
    //         severity: "success",
    //         msg: "Movie Added Successfully",
    //       });
    //       handleClose();
    //     })
    //     .catch(() => {
    //       setSnackbarProps({
    //         open: true,
    //         severity: "error",
    //         msg: "Failed to add movie, Try again!",
    //       });
    //       handleClose();
    //     });
    // }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Book Tickets</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", my: 1 }}>
          <TextField
            label="Mobile Number"
            name="mobile"
            value={ticketBookingFormValues.mobile}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mr: 1 }}
            size="small"
            type="number"
          />
          <TextField
            label="Number of Tickets"
            name="count"
            value={ticketBookingFormValues.count}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            type="number"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          sx={{ backgroundColor: "primary.yellow" }}
          variant="contained"
        >
          {isEditing ? "Update Movie" : "Add movie"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
