import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Predict from "./components/Predict";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/predict" element={<Predict />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="login/dashboard/:id" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
