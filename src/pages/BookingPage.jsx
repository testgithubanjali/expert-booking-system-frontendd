import { useState } from "react";

import { useParams } from "react-router-dom";

import { API } from "../api/api";

function BookingPage() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "",
    notes: ""
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await API.post("/bookings", {
        ...formData,
        expertId: id
      });

      alert(data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        timeSlot: "",
        notes: ""
      });

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "auto"
      }}
    >
      <h1>Book Session</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="text"
          name="timeSlot"
          placeholder="Time Slot"
          value={formData.timeSlot}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            width: "100%",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Book Now
        </button>
      </form>
    </div>
  );
}

export default BookingPage;