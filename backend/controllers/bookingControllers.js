import db from "../config/db.js";
import {
  bookEventQuery,
  cancelEventQuery,
  getAllBookingsQuery,
  getUserBookingsQuery,
} from "../models/tableQueries.js";

export const bookEvent = async (req, res) => {
  const { id } = req.params;
  const { user_id, event_id, seat_numbers, status } = req.body;

  if (!user_id || !event_id || !seat_numbers || !status) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    // 1. Fetch current bookings for that event
    const existing = await db.query(
      "SELECT seat_numbers FROM bookings WHERE event_id = $1",
      [event_id]
    );

    let alreadyBookedSeats = [];
    existing.rows.forEach((row) => {
      alreadyBookedSeats.push(...row.seat_numbers);
    });

    // 2. Check if selected seats overlap
    const conflictSeats = seat_numbers.filter((seat) =>
      alreadyBookedSeats.includes(seat)
    );

    if (conflictSeats.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Seat(s) already booked: ${conflictSeats.join(", ")}`,
      });
    }

    // 3. Insert new booking
    const newBooking = await db.query(
      "INSERT INTO bookings(user_id, event_id, seat_numbers, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, event_id, seat_numbers, status]
    );

    // 4. Update available_seats in events table
    await db.query(
      "UPDATE events SET available_seats = available_seats - $1 WHERE id = $2",
      [seat_numbers.length, event_id]
    );

    res.status(201).json({ success: true, data: newBooking.rows[0] });
  } catch (error) {
    console.error("Error booking event:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const cancelEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const cancelledBooking = await db.query(cancelEventQuery, [id]);
    if (cancelledBooking.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, data: cancelledBooking.rows[0] });
  } catch (error) {
    console.log("Error in cancelling event: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await db.query(getAllBookingsQuery);
    res.status(200).json({ success: true, data: bookings.rows });
  } catch (error) {
    console.log("Error in getting all bookings: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  const { id } = req.params;
  try {
    const userBookings = await db.query(getUserBookingsQuery, id);
    res.status(200).json({ success: true, data: userBookings.rows });
  } catch (error) {
    console.log("Error in getting user's bookings: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
