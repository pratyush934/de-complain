import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ComplaintDetails from "./pages/ComplaintDetails.jsx";
import Authentication from "./components/Authentication.jsx";
import "./styles/global.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav className="navbar">
          <h2 className="logo">De-Complaint</h2>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {isAuthenticated ? (
              <li>
                <button className="auth-btn">Logout</button>
              </li>
            ) : (
              <li>
                <Authentication onLogin={setIsAuthenticated} />
              </li>
            )}
          </ul>
        </nav>

        {/* Main Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/complaint/:id" element={<ComplaintDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
