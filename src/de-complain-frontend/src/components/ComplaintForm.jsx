import React, { useState } from "react";
import { actor } from "../util/icpActor";

export default function ComplaintForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const complaintId = await actor.submit_complaint(
      form.title,
      form.description,
      form.category
    );
    onSubmit({ ...form, id: complaintId, status: "pending" });
  };

  return (
    <form className="complaint-form" onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <select name="category" onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Corruption">Corruption</option>
      </select>
      <button type="submit">Submit Complaint</button>
    </form>
  );
}
