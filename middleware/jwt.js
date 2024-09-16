const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const JWTKey = process.env.JWT_SECRET || JWT_SECRET;

// For authenticating token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from header

  if (token == null) return res.status(401).json({ message: "Need Token" });

  jwt.verify(token, JWTKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Not Valid" });

    req.user = user; // Set user to request object
    next();
  });
};

module.exports = authenticateToken;
