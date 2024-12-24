const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel");
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    // Validate email and password presence
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide both email and password',
        error: true,
        success: false,
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Validate password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Invalid password, please check your password",
        error: true,
        success: false,
      });
    }

    // Prepare token data
    const tokenData = {
      _id: user.id,
      email: user.email,
    };

    // Generate JWT token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

    // Set cookie options
    const tokenOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Enable secure in production
      sameSite: 'strict', // Prevent CSRF attacks
      path: '/', // Available for all routes
      maxAge: 60 * 60 * 8 * 1000, // 8 hours in milliseconds
    };

    // Send token as a cookie and response
    res.cookie("token", token, tokenOptions).status(200).json({
      message: "Login Successfully",
      data: {
        _id: user.id,
        email: user.email,
      },
      success: true,
      error: false,
    });

  } catch (err) {
    // Handle errors and respond with the message
    res.status(500).json({
      message: err.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
