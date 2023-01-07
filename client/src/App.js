import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Predict from "./components/Predict";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Searches from "./components/Searches";
import Home from "./components/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/predict" element={<Predict />} />
        <Route exact path="/searches" element={<Searches />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
