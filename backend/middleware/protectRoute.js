import jwt from "jsonwebtoken";
import db from "../config/db.js";

import dotenv from "dotenv";
dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-event-app"];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });
    }

    // since we pass the user id and role into the jwt token, we can use that id to check if user is present in our users database
    const userByID = await db.query("SELECT * FROM public.users WHERE id=$1;", [
      decoded.id,
    ]);

    if (userByID.rows[0].length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const user = userByID.rows[0];
    delete user["password"]; //show user without the password

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware.", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
