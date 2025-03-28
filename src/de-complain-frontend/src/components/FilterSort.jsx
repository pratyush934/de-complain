import React from "react";

export default function FilterSort({ onFilter }) {
  return (
    <div className="filter-sort">
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="resolved">Resolved</option>
      </select>
    </div>
  );
}
