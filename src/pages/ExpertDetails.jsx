import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{expert.name}</h1>
      <p>{expert.specialization}</p>
      <p>
        <strong>Booked slots:</strong>{" "}
        {bookedSlots.length > 0 ? bookedSlots.join(", ") : "None"}
      </p>
      {/* Add more details as needed */}
    </div>
  );
}

export default ExpertDetails;