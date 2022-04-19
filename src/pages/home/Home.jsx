import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { HomeContainer, HomeSection1, HomeSection2 } from "./Home.styled";
import MoviesListItem from "../../components/movies/MoviesListItem";
import MoviesForm from "../../components/movies/MoviesForm";
import { getMoviesAsync } from "../../redux/moviesSlice";

export default function Home() {
  const sortOptions = [
    { value: "latest", menuText: "Default (latest first)" },
    { value: "created_oldest", menuText: "Created (oldest first)" },
    { value: "highest_rating", menuText: "Rating (highest first)" },
    { value: "lowest_rating", menuText: " Rating (lowest first)" },
    { value: "longest_duration", menuText: "Duration (longest first)" },
    { value: "shortest_duration", menuText: "Duration (shortest first)" },
  ];
  const [sortOption, setSortOption] = useState(sortOptions[0].value);
  const [searchInput, setSearchInput] = useState("");
  const [movieFormOpen, setMovieFormOpen] = useState(false);
  const [movieFormValues, setMovieFormValues] = useState({
    name: "",
    description: "",
    duration: "",
    playTime: new Date(),
    playDate: new Date(),
    ticketPrice: "",
    trailerUrl: "",
    language: "",
    rating: "",
    genre: "",
    imageUrl: "",
  });

  const moviesList = useSelector((state) => state.movies.movies);
  const isAdmin = useSelector((state) => state.users.userInfo.isAdmin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesAsync())
      .unwrap()
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleMovieFormOpen = () => {
    setMovieFormOpen(true);
  };

  const handleMovieFormClose = () => {
    setMovieFormOpen(false);
  };

  return (
    <>
      <Navbar />
      <HomeContainer>
        <HomeSection1>
          <Typography sx={{ fontSize: "3rem", textAlign: "center" }}>
            {isAdmin ? "Movies Admin" : "Movie Tickets"}
          </Typography>
          {!isAdmin && (
            <Typography
              sx={{ fontSize: "1.1rem", textAlign: "center", color: grey[500] }}
            >
              Find Movie and Book Tickets
            </Typography>
          )}
        </HomeSection1>
        <HomeSection2>
          {isAdmin ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 1,
                background: "",
              }}
            >
              <Button
                sx={{ backgroundColor: "primary.yellow" }}
                variant="contained"
                onClick={handleMovieFormOpen}
              >
                Add Movie
              </Button>
            </Box>
          ) : (
            <Typography sx={{ fontSize: "1.8rem", textAlign: "center", py: 1 }}>
              Now Playing
            </Typography>
          )}

          <Container>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                size="small"
                label="Search"
                variant="outlined"
                onChange={handleSearchInputChange}
                value={searchInput}
              />
              <FormControl size="small" sx={{ width: "15em" }}>
                <InputLabel>Sort By:</InputLabel>
                <Select
                  value={sortOption}
                  label="Sort By:"
                  onChange={handleChange}
                >
                  {sortOptions.map((option, idx) => (
                    <MenuItem key={idx} value={option.value}>
                      {option.menuText}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                height: "25rem",
                gridGap: "1em",
                py: 5,
                overflow: "scroll",
              }}
            >
              {moviesList
                .filter((movie) => movie.name.includes(searchInput))
                .map((movie, idx) => (
                  <MoviesListItem key={idx} movie={movie} isAdmin={isAdmin} />
                ))}
            </Box>
          </Container>
        </HomeSection2>
      </HomeContainer>
      <Footer />
      <MoviesForm
        isEditing={false}
        movieFormValues={movieFormValues}
        setMovieFormValues={setMovieFormValues}
        open={movieFormOpen}
        handleClose={handleMovieFormClose}
      />
    </>
  );
}
