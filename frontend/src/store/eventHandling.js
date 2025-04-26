import axios from "axios";
import { create } from "zustand";

export const useEventStore = create((set) => ({
  isEventBooked: false,

  bookingEvent: async (bookingDetails) => {
    set({ isEventBooked: true });
    try {
      const response = await axios.post(
        `/api/booking/${bookingDetails.event.id}`,
        bookingDetails
      );
      set({ bookedEventDetails: response.data, isEventBooked: false });
    } catch (error) {
      set({ isEventBooked: false });
      toast.error(error.response.data.message || "Booking failed");
    }
  },
}));
