// filepath: /c:/Users/HP/Desktop/com/wifmart/backend/middleware/authToken.js
const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "Authentication required. Please login.",
        error: true,
        success: false,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        // Handle token verification errors
        return res.status(403).json({
          message: "Invalid or expired token. Please login again.",
          error: true,
          success: false,
        });
      }

      // Set the user ID in the request object
      req.userId = decoded._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;