import React, { useState } from "react";
import DeComplainActor from "@/util/icpActor.js";

export default function CommentSection({ complaint }) {
  const [comments, setComments] = useState(complaint.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await DeComplainActor.add_comment(complaint.id, newComment);
    setComments([...comments, { user: "You", text: newComment }]);
    setNewComment("");
  };

  return (
    <div className="comments">
      {comments.map((comment, index) => (
        <p key={index}>{comment.text}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}
