import { useParams } from "react-router-dom";

export default function ComplaintDetails() {
  const { id } = useParams();

  return (
    <div className="complaint-details">
      <h2>Complaint #{id}</h2>
      <p>Details of the selected complaint will be displayed here.</p>
    </div>
  );
}
