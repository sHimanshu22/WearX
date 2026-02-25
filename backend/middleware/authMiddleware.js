const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Middleware to protect Routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.user.id).select("-password"); // Exclude password
      next();
    } catch (error) {
      console.error("Token verification Failed : ".error);
      res.status(401).json({ message: "Not Authorized , token failed" });
    }
  } else {
    res
      .status(401)
      .json({ message: " Not authorized, no token Provided" });
  }
};

module.exports = protect;