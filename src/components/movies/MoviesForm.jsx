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

export default function MoviesForm(props) {
  const { open, handleClose, isEditing, movieFormValues, setMovieFormValues } =
    props;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieFormValues({ ...movieFormValues, [name]: value });
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
            value={movieFormValues.playDate}
            onChange={(newValue) => {
              setMovieFormValues({ ...movieFormValues, playDate: newValue });
            }}
            renderInput={(params) => (
              <TextField {...params} size="small" sx={{ mr: 1 }} />
            )}
          />
          <MobileTimePicker
            label="Playing Time"
            value={movieFormValues.playTime}
            onChange={(newValue) => {
              setMovieFormValues({ ...movieFormValues, playTime: newValue });
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
          onClick={handleClose}
          sx={{ backgroundColor: "primary.yellow" }}
          variant="contained"
        >
          {isEditing ? "Update Movie" : "Add movie"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
