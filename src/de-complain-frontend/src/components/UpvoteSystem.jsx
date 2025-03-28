import React, { useState } from "react";
import { actor } from "../util/icpActor";

export default function UpvoteSystem({ complaint }) {
  const [votes, setVotes] = useState(complaint.upvotes || 0);

  const handleUpvote = async () => {
    await actor.upvote_complaint(complaint.id);
    setVotes(votes + 1);
  };

  return (
    <div className="upvote">
      <button onClick={handleUpvote}>👍 Upvote ({votes})</button>
    </div>
  );
}
