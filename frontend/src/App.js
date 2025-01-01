// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import PrivateRoute from "./layout/privateRoute";
import Upload from "./pages/Upload";
import RecordingDetail from "./pages/record/[id]";
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
        <Route path="/record/:id" element={<RecordingDetail />} />
        <Route path="/upload" element={<Upload />} />

      </Routes>
    </div>
  );
}

export default App;
