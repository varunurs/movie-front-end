import React, { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

export default function Register() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(formValues);
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
          />
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
            Sign Up
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
