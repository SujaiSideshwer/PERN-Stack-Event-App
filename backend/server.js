import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { aj } from "./lib/arcjet.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(helmet()); //helmet is a middleware helps set various HTTP headers and helps protect app
app.use(morgan("dev")); //middleware that helps log requests
app.use(cors());
app.use(express.json()); //to parse json from request
app.use(cookieParser()); //to parse the cookie - helps check if the user is logged in to access backend api

// // applying arcjet rate limiting
// app.use(async (req, res, next) => {
//   try {
//     const decision = await aj.protect(req, {
//       requested: 1, //specifies that each request consumes 1 token
//     });
//     if (decision.isDenied()) {
//       if (decision.reason.isRateLimit()) {
//         return res.status(429).json({ error: "Too many requests" });
//       } else if (decision.reason.isBot()) {
//         return res.status(403).json({ error: "Bot access denied" });
//       } else {
//         return res.status(403).json({ error: "Forbidden" });
//       }
//     }
//     // maybe add the spoofed bot check from arcjet if needed

//     next();
//   } catch (error) {
//     console.log("Arcjet error: ", error);
//     next(error);
//   }
// });

app.use("/api/auth", authRoutes);
app.use("/api/events", protectRoute, eventRoutes);
app.use("/api/booking", protectRoute, bookingRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// app.listen(port, () => {
//     console.log(`Server started at ${port}`);
//     connectDB();
//   });
