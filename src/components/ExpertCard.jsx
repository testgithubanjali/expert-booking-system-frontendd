import { Link } from "react-router-dom";

function ExpertCard({ expert }) {
  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="text-xl font-bold">{expert.name}</h2>

      <p>Category: {expert.category}</p>
      <p>Experience: {expert.experience} years</p>
      <p>Rating: {expert.rating}</p>

      <Link
        className="bg-black text-white px-4 py-2 inline-block mt-3"
        to={`/expert/${expert._id}`}
      >
        View Details
      </Link>
    </div>
  );
}

export default ExpertCard;