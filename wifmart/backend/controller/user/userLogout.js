async function userLogout(req, res) {
    try {
        const tokenOption = {
            httpOnly : true,
            secure : true,
            sameSite : 'None'
          }

        console.log("Clearing cookie with options:", tokenOption); // Debugging log

        res.clearCookie("token", tokenOption);

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



