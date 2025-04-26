import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetSingleEvent from "../hooks/useGetSingleEvent";
import { useEventStore } from "../store/eventHandling";
import { useAuthStore } from "../store/authUser";
import { generateTicket } from "../store/generateTicket";
import axios from "axios";
import toast from "react-hot-toast";

const columns = 10; // seats per row

const EventPage = () => {
  const { event, bookedSeats, loading, refetchEvent } = useGetSingleEvent();

  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

  const { user } = useAuthStore();

  console.log("event: ", event);

  if (loading) return <div className="text-center mt-10">Loading event...</div>;

  if (!event)
    return (
      <div className="text-center mt-10 text-red-500">Event not found.</div>
    );

  if (!event)
    return (
      <div className="text-center mt-10 text-red-500">Event not found.</div>
    );

  const totalSeats = event.total_seats;
  // const availableSeats = event.available_seats;

  const cols = 10;
  const rows = Math.ceil(totalSeats / cols);
  // const bookedCount = totalSeats - availableSeats;

  // const bookedSeats = Array.from({ length: bookedCount }, (_, i) => i); // mocked booked seat indices

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    setSelected((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatId = (index) => {
    const row = String.fromCharCode(65 + Math.floor(index / cols)); // A, B, C...
    const col = (index % cols) + 1;
    return `${row}${col}`;
  };

  const handleBooking = async () => {
    const seatIds = selected; // already seat names now
    try {
      const res = await axios.post(`/api/booking/${event.id}`, {
        user_id: user.id,
        event_id: event.id,
        seat_numbers: seatIds,
        status: "confirmed",
      });

      if (res.data.success) {
        toast.success("Booking successful!");
        generateTicket(res.data.data);
        setSelected([]);

        // Refresh the page state manually
        await refetchEvent(); // 👈 we'll define this
      } else {
        toast.error(res.data.message || "Booking failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error booking event");
    }
  };

  return (
    <div
      className="p-6 flex flex-col lg:flex-row gap-6"
      style={{
        backgroundImage: `url(${event.image})`,
        backgroundSize: "cover",
      }}
    >
      {/* Event Details */}
      <div className="bg-black bg-opacity-70 text-white p-6 rounded-xl w-full lg:w-1/2">
        <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
        <p className="mb-4 text-lg italic">{event.description}</p>

        <div className="text-sm space-y-2">
          <p>
            <strong>Date:</strong> {new Date(event.date).toDateString()}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Price:</strong> ₹{event.price}
          </p>
          <p>
            <strong>Available Seats:</strong> {event.available_seats} /{" "}
            {event.total_seats}
          </p>
        </div>
      </div>

      {/* Seat Selector */}
      <div className="bg-white bg-opacity-90 p-6 rounded-xl w-full lg:w-1/2 flex flex-col items-center justify-between">
        <div className="grid grid-cols-10 gap-2 mb-6">
          {/* Rendering seats: */}
          {Array.from({ length: totalSeats }).map((_, index) => {
            const seatId = getSeatId(index);
            const isBooked = bookedSeats.includes(seatId);
            const isSelected = selected.includes(seatId);

            return (
              <button
                key={index}
                onClick={() => toggleSeat(seatId)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
        ${
          isBooked
            ? "bg-gray-400 cursor-not-allowed"
            : isSelected
            ? "bg-green-500 text-white"
            : "bg-blue-200 hover:bg-blue-300"
        }`}
                disabled={isBooked}
              >
                {seatId}
              </button>
            );
          })}
        </div>

        {/* Payment Section */}
        <div className="w-full text-center">
          {selected.length > 0 && (
            <p className="mb-2 text-sm text-gray-800">
              Selected Seats: {selected.map(getSeatId).join(", ")}
            </p>
          )}
          <button
            onClick={handleBooking}
            disabled={selected.length === 0}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            Proceed to Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
