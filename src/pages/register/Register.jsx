import React, { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { registerUserAsync } from "../../redux/authSlice";

export default function Register({ setSnackbarProps }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await dispatch(registerUserAsync({ ...formValues }))
      .unwrap()
      .then(() => {
        setSnackbarProps({
          open: true,
          severity: "success",
          msg: "Registered Successfully!",
        });
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
          onSubmit={handleRegister}
        >
          <TextField
            variant="outlined"
            label="Full Name"
            type="name"
            name="name"
            size="small"
            onChange={handleInputChange}
            value={formValues.name}
            required
          />
          <TextField
            variant="outlined"
            label="E-mail"
            type="email"
            name="email"
            size="small"
            onChange={handleInputChange}
            value={formValues.email}
            required
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            size="small"
            onChange={handleInputChange}
            value={formValues.password}
            required
          />
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
