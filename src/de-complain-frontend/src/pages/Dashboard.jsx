import React, { useState } from "react";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintList from "../components/ComplaintList";
import FilterSort from "../components/FilterSort";

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleNewComplaint = (newComplaint) => {
    setComplaints([...complaints, { id: complaints.length + 1, ...newComplaint, status: "pending" }]);
  };

  const filteredComplaints = complaints.filter(complaint => filter === "all" || complaint.status === filter);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <ComplaintForm onSubmit={handleNewComplaint} />
      <FilterSort onFilter={setFilter} />
      <ComplaintList complaints={filteredComplaints} />
    </div>
  );
}
