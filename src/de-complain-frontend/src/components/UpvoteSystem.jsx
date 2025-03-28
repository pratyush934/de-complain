import React, { useState, useEffect } from "react";
import createDeComplainActor from "@/util/icpActor.js";

export default function UpvoteSystem({ complaint, onUpdate }) {
  const [votes, setVotes] = useState(complaint.upvotes || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setVotes(complaint.upvotes || 0);
  }, [complaint.upvotes]);

  const handleUpvote = async () => {
    if (loading) return; // Prevent multiple clicks

    setLoading(true);
    try {
      const DeComplainActor = await createDeComplainActor();
      await DeComplainActor.upvote_complaint(complaint.id);

      // 🔹 **Update UI Immediately**
      setVotes((prevVotes) => prevVotes + 1);
      if (onUpdate) {
        onUpdate(complaint.id, votes + 1);
      }
    } catch (error) {
      console.error("Error upvoting complaint:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upvote">
      <button onClick={handleUpvote} disabled={loading}>
        {loading ? "Upvoting..." : `👍 Upvote (${votes})`}
      </button>
    </div>
  );
}
