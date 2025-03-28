import React, { useState } from "react";
import DeComplainActor from "@/util/icpActor.js";

export default function StatusTracker({ complaint }) {
  const [status, setStatus] = useState(complaint.status);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await DeComplainActor.update_complaint_status(complaint.id, newStatus);
  };

  return (
    <div className="status-tracker">
      <select value={status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
    </div>
  );
}
