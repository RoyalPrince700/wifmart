const userModel = require('../../models/userModel');

async function userDetailsController(req, res) {
  try {
    // Log the user ID from the auth middleware
    console.log("userId:", req.userId);

    // Fetch the user details by ID
    const user = await userModel.findById(req.userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        data: null,
        error: true,
        success: false,
        message: "User not found",
      });
    }

    // Respond with the user details
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details fetched successfully",
    });

    console.log("Fetched user:", user);
  } catch (err) {
    // Handle unexpected errors
    res.status(500).json({
      message: err.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
