import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateTokenAndSetCookie = (user, res) => {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("jwt-event-app", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000, //1day in millisecs
    httpOnly: true, //prevents access via JS scripts and only allows browser access - helps in security against XSS & cross-site scripting attacks
    sameSite: "strict", //prevents CSRF attacks (cross-site forgery attacks)
    secure: process.env.NODE_ENV !== "development", //i.e if environment is not dev, it allows only https access; if environment is dev, then it allows http access
  });

  return token;
};
