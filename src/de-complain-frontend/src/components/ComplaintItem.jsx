import React from "react";
import UpvoteSystem from "./UpvoteSystem";
import StatusTracker from "./StatusTracker";
import CommentSection from "./CommentSection";

export default function ComplaintItem({ complaint }) {
  return (
    <div className="complaint-item">
      <h3>{complaint.title}</h3>
      <p>{complaint.description}</p>
      <span>Category: {complaint.category}</span>
      <span>Status: {complaint.status}</span>
      <UpvoteSystem complaint={complaint} />
      <StatusTracker complaint={complaint} />
      <CommentSection complaint={complaint} />
    </div>
  );
}
