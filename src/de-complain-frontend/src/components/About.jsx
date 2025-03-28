import React from "react";
import Accordion from "./Accordion.jsx";
import "./../styles/about.css"; // Separated CSS for styling

export default function About() {
  return (
    <section className="about-section">
      <h1 className="about-title">Empowering Voices with De-Complaint</h1>
      <p className="about-desc">
        A <strong>decentralized complaint platform</strong> built on Internet
        Computer Protocol (ICP) for secure, transparent, and immutable
        grievance redressal.
      </p>

      {/* 🔹 Features Section */}
      <div className="features-container">
        <div className="feature-card">
          <h3>🔒 Secure & Decentralized</h3>
          <p>Blockchain-backed complaint system ensuring data integrity.</p>
        </div>
        <div className="feature-card">
          <h3>🌍 Transparency & Fairness</h3>
          <p>Every complaint is public & auditable, eliminating corruption.</p>
        </div>
        <div className="feature-card">
          <h3>🚀 Community Driven</h3>
          <p>Upvote complaints to drive real change in society.</p>
        </div>
        <div className="feature-card">
          <h3>📡 Real-Time Tracking</h3>
          <p>Authorities update complaint statuses, keeping users informed.</p>
        </div>
      </div>

      {/* 🔹 FAQ Accordion */}
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <Accordion />

      {/* 🔹 CTA */}
      <div className="cta">
        <h2>Ready to Make a Change?</h2>
        <p>Join our decentralized community and make your voice heard.</p>
        <a href="/dashboard" className="cta-btn">
          Submit a Complaint
        </a>
      </div>
    </section>
  );
}
