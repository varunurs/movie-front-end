import React, { useState } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StyledAppBar } from "./Navbar.styled";
import { navLinks } from "./navLinks";
import { logOut } from "../../redux/authSlice";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(navLinks.title.path);
            }}
          >
            {navLinks.title.text}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                key={navLinks.title.text}
                onClick={() => {
                  navigate(navLinks.title.path);
                }}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem
                  onClick={() => {
                    dispatch(logOut());
                  }}
                >
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              ) : (
                navLinks.links.map((link, idx) => (
                  <MenuItem
                    key={idx}
                    onClick={() => {
                      navigate(link.path);
                    }}
                  >
                    <Typography textAlign="center">{link.text}</Typography>
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            onClick={() => {
              navigate(navLinks.title.path);
            }}
          >
            {navLinks.title.text}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isLoggedIn ? (
              <Button
                onClick={() => {
                  dispatch(logOut());
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Log Out
              </Button>
            ) : (
              navLinks.links.map((link, idx) => (
                <Button
                  key={idx}
                  onClick={() => {
                    navigate(link.path);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {link.text}
                </Button>
              ))
            )}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
