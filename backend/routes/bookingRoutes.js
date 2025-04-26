import express from "express";
import {
  bookEvent,
  cancelEvent,
  getAllBookings,
  getUserBookings,
} from "../controllers/bookingControllers.js";

const router = express.Router();

router.post("/:id", bookEvent);

router.get("/all", getAllBookings);

router.get("/userbooking/:id", getUserBookings);

router.delete("/cancel/:id", cancelEvent);

export default router;
