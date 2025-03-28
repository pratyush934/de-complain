import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to De-Complaint</h1>
      <p>A decentralized platform to raise and track complaints.</p>
      <Link to="/dashboard" className="btn">View Complaints</Link>
    </div>
  );
}
