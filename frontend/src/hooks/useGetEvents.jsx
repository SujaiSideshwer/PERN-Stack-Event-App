import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetEvents = () => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(`/api/events`);
        console.log("events results: ", res);
        setEvents(res.data.data); //from our backend api we are sending the response as data, hence res.data
      } catch (error) {
        if (error.message.includes("404")) {
          setEvents(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);
  return { loading, events };
};

export default useGetEvents;
