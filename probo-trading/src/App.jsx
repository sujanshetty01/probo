import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const isAuthenticated = localStorage.getItem("token"); // Check if the user is logged in

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> {/* Default route */}
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        /> 
      </Routes>
    </Router>
  );
};

export default App;
