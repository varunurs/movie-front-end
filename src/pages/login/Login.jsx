import React, { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { loginUserAsync } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login({ setSnackbarProps }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUserAsync({ ...formValues }))
      .unwrap()
      .then(() => {
        console.log("Logged in");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        setSnackbarProps({
          open: true,
          severity: "error",
          msg: "Invalid Credentials",
        });
      });
  };
  return (
    <>
      <Navbar />
      <Container
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "20rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          component="form"
          onSubmit={handleLogin}
        >
          <TextField
            variant="outlined"
            label="E-mail"
            type="email"
            name="email"
            size="small"
            onChange={handleInputChange}
            value={formValues.email}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            size="small"
            onChange={handleInputChange}
            value={formValues.password}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
