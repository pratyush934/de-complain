import { useState } from "react";
import CommentSection from "./CommentSection.jsx";
import StatusTracker from "./StatusTracker.jsx";
import UpvoteSystem from "./UpvoteSystem.jsx";
import createDeComplainActor from "@/util/icpActor.js";
// import "../styles/ComplaintItem.css"; // Import new stylesbbbaaa
import "../styles/ComplaintList.css"

export default function ComplaintItem({ complaint, onUpdate }) {
  const [status, setStatus] = useState(complaint.status);
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async () => {
    if (status === "Resolved") return; // Prevent redundant updates
    setLoading(true);
    try {
      const DeComplainActor = await createDeComplainActor();
      await DeComplainActor.update_complaint_status(complaint.id, "Resolved");

      setStatus("Resolved");
      onUpdate(complaint.id, "Resolved");
    } catch (error) {
      console.error("Error updating complaint status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaint-card">
      <div className="complaint-header">
        <h3>{complaint.title}</h3>
        <span className={`status-tag status-${status}`}>
          {status}
        </span>
      </div>

      <p className="complaint-description">{complaint.description}</p>
      <span className="category-tag">📂 {complaint.category}</span>

      <div className="complaint-actions">
        <UpvoteSystem complaint={complaint} />
        <StatusTracker complaint={complaint} />
      </div>

      <CommentSection complaint={complaint} />

      <button
        className={`update-btn ${status === "Resolved" ? "disabled" : ""}`}
        onClick={handleStatusUpdate}
        disabled={loading || status === "Resolved"}
      >
        {loading
          ? "Updating..."
          : status === "Resolved"
          ? "Resolved ✅"
          : "Mark as Resolved"}
      </button>
    </div>
  );
}
