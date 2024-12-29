// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import PrivateRoute from "./layout/privateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/home"
          element={
            <PrivateRoute requiredRoles={["user"]}>
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
