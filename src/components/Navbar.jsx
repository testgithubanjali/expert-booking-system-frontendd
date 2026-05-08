import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="p-4 bg-black text-white flex justify-between">
      <Link to="/">Experts</Link>
      <Link to="/my-bookings">My Bookings</Link>
    </div>
  );
}

export default Navbar;