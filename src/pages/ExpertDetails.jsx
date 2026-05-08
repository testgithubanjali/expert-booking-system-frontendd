import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { io } from "socket.io-client";

import { API } from "../api/api";

const socket = io("http://localhost:5000");

function ExpertDetails() {
  const { id } = useParams();

  const [expert, setExpert] = useState(null);

  const [bookedSlots, setBookedSlots] = useState([]);

  const fetchExpert = async () => {
    try {
      const { data } = await API.get(`/experts/${id}`);

      setExpert(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpert();

    socket.on("slotBooked", data => {
      if (data.expertId === id) {
        setBookedSlots(prev => [...prev, data.timeSlot]);
      }
    });

export default ExpertDetails;