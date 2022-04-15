import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />
    </>
  );
}

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Home />} />
      <Route path="/register" element={<Home />} />
    </Routes>
  );
}
