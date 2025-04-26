import axios from "axios";
import { useEffect } from "react";
import React from "react";
import BookingCard from "./BookingCard.jsx";
import { useState } from "react";
import { useAuthStore } from "../store/authUser.js";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    axios.get("/api/booking/all").then((res) => {
      if (res.data.success) {
        setBookings(res.data.data.filter((b) => b.user_id === user.id));
      }
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">My Bookings</h1>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
