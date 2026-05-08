import { useState } from "react";

import { API } from "../api/api";

function MyBookings() {
  const [email, setEmail] = useState("");

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get(`/bookings?email=${email}`);

      setBookings(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Bookings</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px"
          }}
        />

        <button
          onClick={fetchBookings}
          style={{
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map(item => (
          <div
            key={item._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px"
            }}
          >
            <h2>{item.expertId.name}</h2>

            <p>
              <strong>Date:</strong> {item.date}
            </p>

            <p>
              <strong>Time Slot:</strong> {item.timeSlot}
            </p>

            <p>
              <strong>Status:</strong> {item.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;