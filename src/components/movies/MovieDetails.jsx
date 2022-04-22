import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export default function MovieDetails(props) {
  const { open, handleClose, movie } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {movie.name}
          </Typography>
          <Box sx={{ width: "200px", height: "200px" }}>
            <Box
              component="img"
              src={movie.imageUrl}
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ flex: 2 }}>
            <Typography>Description:</Typography>
            <Typography sx={{ width: "70%", textAlign: "justify" }}>
              {movie.description}
            </Typography>

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
              flexDirection: "column",
              my: 2,
              flex: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                const url = movie.trailerUrl;
                console.log(url);
                window.open(url, "_blank");
              }}
            >
              Watch Trailer
            </Button>
            <Button variant="contained" sx={{ my: 1 }}>
              Book Tickets
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
