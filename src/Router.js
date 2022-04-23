import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Snackbar from "./components/snackbar/Snackbar";
import MovieDetails from "./components/movies/MovieDetails";
import NotFound from "./pages/notFound/NotFound";

export default function Router() {
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    msg: "",
    severity: "error",
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarProps({ ...snackbarProps, open: false });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setSnackbarProps={setSnackbarProps} />}
        />
        <Route
          path="/register"
          element={<Register setSnackbarProps={setSnackbarProps} />}
        />
        <Route
          path="/movie-details"
          element={<MovieDetails setSnackbarProps={setSnackbarProps} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Snackbar
        snackbarOpen={snackbarProps.open}
        msg={snackbarProps.msg}
        severity={snackbarProps.severity}
        handleClose={handleSnackbarClose}
      />
    </>
  );
}
