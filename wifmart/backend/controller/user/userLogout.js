async function userLogout(req, res) {
    try {
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
        };

        console.log("Clearing cookie with options:", cookieOptions); // Debugging log

        res.clearCookie("token", cookieOptions);

        res.json({
            message: "Logged out Successfully",
            error: false,
            success: true,
            data: []
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userLogout;


