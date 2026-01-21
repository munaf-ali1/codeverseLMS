import jwt from "jsonwebtoken";

import User from "../models/user.js";

const protect = async (req, res, next) => {
  

  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};

export default protect;


