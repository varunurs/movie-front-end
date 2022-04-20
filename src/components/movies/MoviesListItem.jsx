import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { deleteMoviesAsync } from "../../redux/moviesSlice";

const getBadgeColor = (theme, type) => {
  if (type === "rating") return theme.palette.primary.rating;
  else if (type === "genre") return theme.palette.primary.genre;
  else if (type === "duration") return theme.palette.primary.duration;
};

const Badge = styled(Box)(({ theme, type }) => ({
  borderRadius: theme.spacing(2),
  height: "2rem",
  display: "flex",
  color: "white",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1),
  backgroundColor: getBadgeColor(theme, type),
}));

export default function MoviesListItem(props) {
  const {
    movie,
    isAdmin,
    setIsEditing,
    setMovieFormValues,
    setMovieFormOpen,
    setSnackbarProps,
  } = props;

  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
    const playDate = new Date(`${movie.playingDate}Z`);
    const playTime = new Date(`${movie.playingTime}Z`);
    setMovieFormValues({
      ...movie,
      playingDate: playDate,
      playingTime: playTime,
    });
    setMovieFormOpen(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteMoviesAsync({ id: movie.id }))
      .unwrap()
      .then(() => {
        setSnackbarProps({
          open: true,
          severity: "success",
          msg: "Movie Deleted Successfully",
        });
      })
      .catch(() => {
        setSnackbarProps({
          open: true,
          severity: "error",
          msg: "Failed to delete movie, Try again!",
        });
      });
  };

  return (
    <Box
      sx={{
        background: "white",
        justifySelf: "center",
        width: "70%",
        height: "20rem",
        display: "grid",
        cursor: "pointer",
        gridTemplateAreas: `"image"
                            "title"
                            "info"
                            "manage"`,
      }}
    >
      <Box sx={{ gridArea: "image", width: "100%", height: "11rem" }}>
        <Box
          component="img"
          src={movie.imageUrl}
          alt={`${movie.name} image link`}
          sx={{ width: "100%", height: "100%" }}
        />
      </Box>
      <Typography
        sx={{ gridArea: "title", fontSize: "1.5rem", textAlign: "center" }}
      >
        {movie.name}
      </Typography>
      <Box
        sx={{
          gridArea: "info",
          display: "flex",
          justifyContent: "space-between",
          px: 1,
        }}
      >
        <Badge type="rating">{movie.rating}</Badge>
        <Badge type="genre">{movie.genre}</Badge>
        <Badge type="duration">{movie.duration}</Badge>
      </Box>
      {isAdmin && (
        <Box
          sx={{
            gridArea: "manage",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button sx={{ flex: 1 }} onClick={handleEdit}>
            <EditIcon sx={{ color: "primary.green" }} />
          </Button>
          <Button sx={{ flex: 1 }} onClick={handleDelete}>
            <DeleteIcon sx={{ color: "primary.red" }} />
          </Button>
        </Box>
      )}
    </Box>
  );
}
