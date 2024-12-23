const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel");
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    // Validate email and password presence
    if (!email) {
      return res.json({ message: 'Please provide email', error: true, success: false });
    }
    if (!password) {
      return res.json({ message: 'Please provide password', error: true, success: false });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: 'User not found', error: true, success: false });
    }

    // Validate password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.json({ message: 'Invalid password', error: true, success: false });
    }

    // Prepare token data
    const tokenData = {
      _id: user.id,
      email: user.email,
    };

    // Generate JWT token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); // token will expire after 8 hours

    // Set cookie options
    const tokenOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'Strict', // Ensure cookies are sent only to the same site
      path: '/',
    };

    // Send token as a cookie and return response with token data
    res.cookie("token", token, tokenOptions).json({
      message: "Login Successfully",
      data: tokenData,
      success: true,
      error: false,
    });
  } catch (err) {
    // Handle errors and respond with the message
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;