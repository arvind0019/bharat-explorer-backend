import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const adminOnly = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user?.isAdmin) return res.status(403).json({ message: "Admins only" });
  next();
};
