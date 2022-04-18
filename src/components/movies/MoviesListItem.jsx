import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { styled } from "@mui/system";

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
  const { movie, isAdmin } = props;
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
          src={movie.ImageUrl}
          alt={`${movie.Name} image link`}
          sx={{ width: "100%", height: "100%" }}
        />
      </Box>
      <Typography
        sx={{ gridArea: "title", fontSize: "1.5rem", textAlign: "center" }}
      >
        {movie.Name}
      </Typography>
      <Box
        sx={{
          gridArea: "info",
          display: "flex",
          justifyContent: "space-between",
          px: 1,
        }}
      >
        <Badge type="rating">{movie.Rating}</Badge>
        <Badge type="genre">{movie.Genre}</Badge>
        <Badge type="duration">{movie.Duration}</Badge>
      </Box>
      {isAdmin && (
        <Box
          sx={{
            gridArea: "manage",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button sx={{ flex: 1 }}>
            <EditIcon sx={{ color: "primary.green" }} />
          </Button>
          <Button sx={{ flex: 1 }}>
            <DeleteIcon sx={{ color: "primary.red" }} />
          </Button>
        </Box>
      )}
    </Box>
  );
}
