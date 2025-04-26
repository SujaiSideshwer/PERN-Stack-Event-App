import express from "express";
import {
  createEvent,
  // getEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  getSingleEvent,
} from "../controllers/eventControllers.js";

const router = express.Router();

router.get("/", getAllEvents);

router.get("/:id", getSingleEvent);

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;
