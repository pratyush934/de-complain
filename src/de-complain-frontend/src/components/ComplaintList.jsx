import React, { useEffect, useState } from "react";
import ComplaintItem from "./ComplaintItem";
import { actor } from "../util/icpActor";

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    async function fetchComplaints() {
      const fetchedComplaints = await actor.get_complaints();
      setComplaints(fetchedComplaints);
    }
    fetchComplaints();
  }, []);

  return (
    <div className="complaint-list">
      {complaints.map((complaint) => (
        <ComplaintItem key={complaint.id} complaint={complaint} />
      ))}
    </div>
  );
}
