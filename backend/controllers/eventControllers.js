import db from "../config/db.js";
import {
  createEventQuery,
  deleteEventQuery,
  getAllEventsQuery,
  getEventQuery,
  updateEventQuery,
} from "../models/tableQueries.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await db.query(getAllEventsQuery);
    // console.log("fetched events: ", events.rows);
    res.status(200).json({ success: true, data: events.rows });
  } catch (error) {
    console.log("Error in getting all events: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEvent = async (req, res) => {
  //   const {
  //     title,
  //     description,
  //     image,
  //     date,
  //     time,
  //     location,
  //     price,
  //     total_seats,
  //     available_seats,
  //     organizer_id,
  //   } = req.body;

  const requiredFields = [
    "title",
    "description",
    "image",
    "date",
    "time",
    "location",
    "price",
    "total_seats",
    "available_seats",
    "organizer_id", //Note for later: organizer_id needs to be got from the JWT token of the organiser login details
  ];

  const missing = requiredFields.filter((field) => !req.body[field]);

  const values = requiredFields.map((field) => req.body[field]); //mapping each value of requiredFields with the actual value got from req.body

  if (missing.length) {
    return res.status(400).json({
      success: false,
      message: `Missing required field(s): ${missing.join(", ")}`,
    });
  }

  try {
    const newEvent = await db.query(createEventQuery, values); //values has all the values which shall take the place of the placeholders $1,$2,etc. which are there in the query that has been imported
    console.log("New event added: ", newEvent);
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    console.log("Error in creating event: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// // get Single event without seat_numbers:
// export const getEvent = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const event = await db.query(getEventQuery, [id]);
//     res.status(200).json({ success: true, data: event });
//   } catch (error) {
//     console.log("Error in getting event: ", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// With seat numbers get single event
export const getSingleEvent = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch event details
    const eventResult = await db.query("SELECT * FROM events WHERE id = $1", [
      id,
    ]);
    const event = eventResult.rows[0];

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    // Fetch all booked seats
    const bookingsResult = await db.query(
      "SELECT seat_numbers FROM bookings WHERE event_id = $1",
      [id]
    );

    let bookedSeats = [];
    bookingsResult.rows.forEach((row) => {
      bookedSeats.push(...row.seat_numbers);
    });

    res.status(200).json({
      success: true,
      data: {
        event,
        bookedSeats,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateEvent = async (req, res) => {
  //this update event handles partial updates
  const { id } = req.params;
  const allowedFields = [
    "title",
    "description",
    "date",
    "time",
    "location",
    "price",
    "total_seats",
    "available_seats",
    "organizer_id",
    "image_url", // add any new fields here
  ];

  // Extract only valid fields that are present in req.body
  const fieldsToUpdate = Object.keys(req.body).filter((field) =>
    allowedFields.includes(field)
  );

  // If no valid fields are provided, return an error
  if (fieldsToUpdate.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No valid fields provided to update" });
  }

  // Build the SET clause dynamically: "title=$1, price=$2, ..."
  const setClause = fieldsToUpdate
    .map((field, index) => `"${field}"=$${index + 1}`)
    .join(", ");

  // Get the actual values in the same order
  const values = fieldsToUpdate.map((field) => req.body[field]);

  // Add ID as the last parameter (for WHERE clause)
  values.push(id);

  // Final dynamic query
  const query = `UPDATE public.events SET ${setClause} WHERE id=$${values.length} RETURNING *`;

  try {
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await db.query(deleteEventQuery, [id]);
    if (deletedEvent.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, data: deletedEvent.rows[0] });
  } catch (error) {
    console.log("Error in deleting event: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
