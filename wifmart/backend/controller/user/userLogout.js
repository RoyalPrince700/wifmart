const userLogout = async (req, res) => {
    try {
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/', // Ensure this matches the path used when setting the cookie
        };

        console.log("Clearing cookie with options:", cookieOptions); // Debugging log

        // Clear the authentication cookie
        res.clearCookie("token", cookieOptions);

        // Respond with success message
        return res.status(200).json({
            message: "Logged out Successfully",
            error: false,
            success: true,
            data: []
        });
    } catch (err) {
        console.error("Error during logout:", err); // Debugging log

        // Handle errors gracefully
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

module.exports = userLogout;
