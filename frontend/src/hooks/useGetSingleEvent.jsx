import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const useGetSingleEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvent = useCallback(async () => {
    setLoading(true); // optional: show loading if you want when refetching
    try {
      const res = await axios.get(`/api/events/${id}`);
      setEvent(res.data.data.event);
      setBookedSeats(res.data.data.bookedSeats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return { event, bookedSeats, loading, refetchEvent: fetchEvent }; // 🔥 exposing refetchEvent
};

export default useGetSingleEvent;
