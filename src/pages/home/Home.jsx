import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { HomeContainer, HomeSection1, HomeSection2 } from "./Home.styled";
import MoviesListItem from "../../components/movies/MoviesListItem";

export default function Home() {
  const moviesList = useSelector((state) => state.movies.movies);

  const sortOptions = [
    { value: "latest", menuText: "Default (latest first)" },
    { value: "created_oldest", menuText: "Created (oldest first)" },
    { value: "highest_rating", menuText: "Rating (highest first)" },
    { value: "lowest_rating", menuText: " Rating (lowest first)" },
    { value: "longest_duration", menuText: "Duration (longest first)" },
    { value: "shortest_duration", menuText: "Duration (shortest first)" },
  ];
  const [sortOption, setSortOption] = useState(sortOptions[0].value);
  const [searchInput, setSearchInput] = useState("abc");

  const handleChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <Navbar />
      <HomeContainer>
        <HomeSection1>
          <Typography sx={{ fontSize: "3rem", textAlign: "center" }}>
            Movie Tickets
          </Typography>
          <Typography
            sx={{ fontSize: "1.1rem", textAlign: "center", color: grey[500] }}
          >
            Find Movie and Book Tickets
          </Typography>
        </HomeSection1>
        <HomeSection2>
          <Typography sx={{ fontSize: "1.8rem", textAlign: "center", py: 1 }}>
            Now Playing
          </Typography>
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
                .filter((movie) => movie.Name.includes(searchInput))
                .map((movie, idx) => (
                  <MoviesListItem key={idx} movie={movie} />
                ))}
            </Box>
          </Container>
        </HomeSection2>
      </HomeContainer>
      <Footer />
    </>
  );
}
