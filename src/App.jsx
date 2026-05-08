import { Routes, Route } from "react-router-dom";
import Experts from "./pages/Experts";
import ExpertDetails from "./pages/ExpertDetails";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";
import Navbar from "./components/Navbar";
import AddExpert from "./pages/AddExpert";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Experts />} />
        <Route path="/expert/:id" element={<ExpertDetails />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/add-expert" element={<AddExpert />} />
      </Routes>
    </>
  );
}

export default App;