const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required. Please log in.",
                error: true,
                success: false,
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false,
                });
            }

            req.userId = decoded._id; // Attach the user ID to the request
            next(); // Proceed to the next middleware or route handler
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;
