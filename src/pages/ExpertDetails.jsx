import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { io } from "socket.io-client";

import { API } from "../api/api";

const socket = io("http://localhost:5000");

function ExpertDetails() {

  const { id } = useParams();

  const [expert, setExpert] = useState(null);

  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {

    const fetchExpert = async () => {

      try {

        const { data } = await API.get(`/experts/${id}`);

        setExpert(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchExpert();

    const handleSlotBooked = data => {

      if (data.expertId === id) {

        setBookedSlots(prev => [...prev, data.timeSlot]);
      }
    };

    socket.on("slotBooked", handleSlotBooked);

    return () => {
      socket.off("slotBooked", handleSlotBooked);
    };

  }, [id]);

  if (!expert) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container" style={{ paddingTop: "30px" }}>

      <div className="card">

        <h1>{expert.name}</h1>

        <p>
          <strong>Category:</strong> {expert.category}
        </p>

        <p>
          <strong>Experience:</strong> {expert.experience} years
        </p>

        <p>
          <strong>Rating:</strong> ⭐ {expert.rating}
        </p>

      </div>

      <h2 style={{ marginTop: "30px", marginBottom: "20px" }}>
        Available Slots
      </h2>

      {expert.availableSlots.map(item => (

        <div
          key={item.date}
          className="card"
        >

          <h3>{item.date}</h3>

          <div className="slot-container">

            {item.slots.map(slot => {

              const isBooked = bookedSlots.includes(slot);

              return (
                <Link
                  key={slot}
                  to={`/booking/${id}?date=${item.date}&slot=${slot}`}
                >

                  <button
                    disabled={isBooked}
                    className="slot-btn"
                  >
                    {isBooked ? "Booked" : slot}
                  </button>

                </Link>
              );
            })}

          </div>

        </div>
      ))}

    </div>
  );
}

export default ExpertDetails;