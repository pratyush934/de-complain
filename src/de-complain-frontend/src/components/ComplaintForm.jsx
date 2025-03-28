import React, { useEffect, useState } from "react";
import createDeComplainActor from "@/util/icpActor.js";
import { login } from "@/auth.js"; // Import login function
import "../styles/ComplainForm.css";

export default function ComplaintForm({ onSubmit, user }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [DeComplainActor, setDeComplainActor] = useState(null);

  // Initialize actor on component mount
  useEffect(() => {
    async function initActor() {
      const actor = await createDeComplainActor();
      setDeComplainActor(actor);
    }
    initActor();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to submit a complaint!"); // Auth check
    if (!DeComplainActor) return console.error("ICP Actor not initialized!");

    try {
      console.log("Submitting complaint:", form);

      const complaintId = await DeComplainActor.submit_complaint(
        form.title,
        form.description,
        form.category
      );

      console.log("Complaint submitted successfully:", complaintId);

      // **🔹 Update UI Immediately**
      onSubmit({
        id: complaintId,
        title: form.title,
        description: form.description,
        category: form.category,
        status: "pending",
        upvotes: 0,
        comments: [],
      });

      // **🔹 Reset Form**
      setForm({ title: "", description: "", category: "" });
      console.log("Current User State in ComplaintForm:", user);
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  return (
    <div className="complaint-form-container">
      <h2>📢 Submit a Complaint</h2>

      <form className="complaint-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter Complaint Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Describe the Issue"
          value={form.description}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Infrastructure">🏗 Infrastructure</option>
          <option value="Corruption">💰 Corruption</option>
        </select>
        <button type="submit" disabled={!DeComplainActor}>
          {DeComplainActor ? "📨 Submit Complaint" : "🔄 Initializing..."}
        </button>
      </form>
    </div>
  );
}
