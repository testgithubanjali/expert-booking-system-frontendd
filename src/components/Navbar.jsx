import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2 style={{ color: "white" }}>Expert Booking</h2>

      <div className="nav-links">
        <Link to="/">Experts</Link>
        <Link to="/add-expert">Add Expert</Link>
        <Link to="/my-bookings">My Bookings</Link>
      </div>
    </div>
  );
}

export default Navbar;