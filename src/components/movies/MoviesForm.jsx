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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { addMoviesAsync, updateMoviesAsync } from "../../redux/moviesSlice";

export default function MoviesForm(props) {
  const {
    open,
    handleClose,
    isEditing,
    movieFormValues,
    setMovieFormValues,
    setSnackbarProps,
  } = props;

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieFormValues({ ...movieFormValues, [name]: value });
  };

  const handleSubmit = async () => {
    if (isEditing) {
      await dispatch(updateMoviesAsync(movieFormValues))
        .unwrap()
        .then(() => {
          setSnackbarProps({
            open: true,
            severity: "success",
            msg: "Movie Updated Successfully",
          });
          handleClose();
        })
        .catch(() => {
          setSnackbarProps({
            open: true,
            severity: "error",
            msg: "Failed to update movie, Try again!",
          });
          handleClose();
        });
    } else {
      await dispatch(addMoviesAsync(movieFormValues))
        .unwrap()
        .then(() => {
          setSnackbarProps({
            open: true,
            severity: "success",
            msg: "Movie Added Successfully",
          });
          handleClose();
        })
        .catch(() => {
          setSnackbarProps({
            open: true,
            severity: "error",
            msg: "Failed to add movie, Try again!",
          });
          handleClose();
        });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditing ? "Edit Movie" : "Add movie"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", my: 1 }}>
          <TextField
            label="Movie Name"
            name="name"
            value={movieFormValues.name}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mr: 1 }}
            size="small"
          />
          <TextField
            label="Genre"
            name="genre"
            value={movieFormValues.genre}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
        </Box>
        <TextField
          label="Description"
          name="description"
          value={movieFormValues.description}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          fullWidth
        />
        <Box sx={{ display: "flex", my: 1 }}>
          <TextField
            label="Language"
            name="language"
            value={movieFormValues.language}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mr: 1 }}
            size="small"
          />
          <TextField
            label="Duration"
            name="duration"
            value={movieFormValues.duration}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
        </Box>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            openTo="year"
            views={["year", "month", "day"]}
            value={movieFormValues.playingDate}
            onChange={(newValue) => {
              setMovieFormValues({
                ...movieFormValues,
                playingDate: newValue.toISOString().split(".")[0],
              });
            }}
            renderInput={(params) => (
              <TextField {...params} size="small" sx={{ mr: 1 }} />
            )}
          />
          <MobileTimePicker
            label="Playing Time"
            value={movieFormValues.playingTime}
            onChange={(newValue) => {
              setMovieFormValues({
                ...movieFormValues,
                playingTime: newValue.toISOString().split(".")[0],
              });
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </LocalizationProvider>

        <Box sx={{ display: "flex", my: 1 }}>
          <TextField
            label="Ticket Price"
            name="ticketPrice"
            value={movieFormValues.ticketPrice}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mr: 1 }}
            size="small"
          />
          <TextField
            label="Rating"
            name="rating"
            value={movieFormValues.rating}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
        </Box>
        <TextField
          label="Trailer URL"
          name="trailerUrl"
          value={movieFormValues.trailerUrl}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          sx={{ mb: 1 }}
          fullWidth
        />
        <TextField
          label="Poster Image URL"
          name="imageUrl"
          value={movieFormValues.imageUrl}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          fullWidth
        />
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