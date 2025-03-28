import React, { useState, useEffect } from "react";
import ComplaintItem from "./ComplaintItem.jsx";
import FilterSort from "./FilterSort.jsx";
import createDeComplainActor from "@/util/icpActor.js";

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchComplaints() {
      try {
        const DeComplainActor = await createDeComplainActor();
        const complaintList = await DeComplainActor.get_complaints();
        
        console.log("Fetched complaints:", complaintList);
        
        setComplaints(complaintList);
        setFilteredComplaints(complaintList); // Default: Show all
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    }
    fetchComplaints();
  }, []);

  // 🔹 Handle filter change
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);

    if (selectedFilter === "all") {
      setFilteredComplaints(complaints);
    } else {
      setFilteredComplaints(
        complaints.filter((c) => c.status.toLowerCase() === selectedFilter)
      );
    }
  };

  // 🔹 Update complaint status in UI
  const handleComplaintUpdate = (id, newStatus) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );

    setFilteredComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  return (
    <div>
      <h2>Complaint List</h2>
      <FilterSort onFilter={handleFilterChange} />

      <div className="complaints-container">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <ComplaintItem
              key={complaint.id}
              complaint={complaint}
              onUpdate={handleComplaintUpdate}
            />
          ))
        ) : (
          <p>No complaints found.</p>
        )}
      </div>
    </div>
  );
}
