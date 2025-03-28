import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ComplaintDetails from "./pages/ComplaintDetails.jsx";
import About from "./components/About.jsx";
import { initAuth, login, logout } from "./auth.js"; // Import authentication functions
import "./styles/global.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔹 Initialize authentication on mount
  useEffect(() => {
    async function checkAuth() {
      await initAuth(); // Initialize the authentication client
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    }
    checkAuth();
  }, []);

  // 🔹 Handle login
  const handleLogin = async () => {
    await login(setUser);
    setIsAuthenticated(true);
  };

  // 🔹 Handle logout
  const handleLogout = async () => {
    await logout(setUser);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        {/* 🔹 Navbar */}
        <nav className="navbar">
          <h2 className="logo">🚀 De-Complaint</h2>
          <ul className="nav-links">
            <li>
              <Link to="/">🏠 Home</Link>
            </li>
            <li>
              <Link to="/dashboard">📊 Dashboard</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="user-info">👤 {user?.name || "User"}</li>
                <li>
                  <button className="auth-btn" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button className="auth-btn" onClick={handleLogin}>
                  🔑 Login with ICP
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* 🔹 Main Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/complaint/:id" element={<ComplaintDetails />} />
          </Routes>
        </div>

        {/* 🔹 About Section */}
        <About />

        {/* 🔹 Footer */}
        <footer className="footer">
          <p>© 2025 De-Complaint | Secure, Transparent & Decentralized</p>
        </footer>
      </div>
    </Router>
  );
}
