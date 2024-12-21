const jwt = require("jsonwebtoken");
const jwtSecret = require("../constants").jwtSecret;

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed: No token provided" });
    }

    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Invalid token" });
  }
};

module.exports = authMiddleware;
