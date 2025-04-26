import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authUser";
import useGetEvents from "../../hooks/useGetEvents";
import { Loader } from "lucide-react";

const Homescreen = () => {
  const { loading, events } = useGetEvents();

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    events && (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6 text-indigo-700">
          Available Events
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition"
              onClick={() => navigate(`/event/${event.id}`)}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-500">{event.description}</p>
                <div className="mt-2 text-sm text-gray-600">
                  📍 {event.location} <br />
                  🕘 {event.time} | 🗓 {new Date(event.date).toDateString()}{" "}
                  <br />
                  🎟 ₹{event.price} | {event.available_seats}/{event.total_seats}{" "}
                  seats left
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Homescreen;
