import { Link } from "react-router-dom";

function ExpertCard({ expert }) {
  return (
    <div className="card">
      <h2>{expert.name}</h2>

      <p>
        <strong>Category:</strong> {expert.category}
      </p>

      <p>
        <strong>Experience:</strong> {expert.experience} years
      </p>

      <p>
        <strong>Rating:</strong> ⭐ {expert.rating}
      </p>

      <Link to={`/expert/${expert._id}`}>
        <button className="btn">
          View Details
        </button>
      </Link>
    </div>
  );
}

export default ExpertCard;