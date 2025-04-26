// === src/components/BookingCard.jsx ===
import axios from "axios";
import { toast } from "react-hot-toast";

const BookingCard = ({ booking, onCancel }) => {
  const handleCancel = async () => {
    try {
      const res = await axios.delete(`/api/booking/cancel/${booking.id}`);
      if (res.data.success) {
        toast.success("Booking cancelled");
        onCancel?.(booking.id);
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (err) {
      toast.error("Error cancelling booking");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 border">
      <h2 className="text-lg font-semibold">Booking ID: {booking.id}</h2>
      <p>Event ID: {booking.event_id}</p>
      <p>Seats: {booking.seat_numbers.join(", ")}</p>
      <p>Status: {booking.status}</p>
      <p className="text-sm text-gray-500">
        Booked on: {new Date(booking.created_at).toLocaleString()}
      </p>
      <button
        onClick={handleCancel}
        className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md self-start"
      >
        Cancel Booking
      </button>
    </div>
  );
};

export default BookingCard;
