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
      throw new Error("User not found");
    }

    // Validate password
    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("checkPassword", checkPassword);

    if (checkPassword) {
      // Prepare token data
      const tokenData = {
        _id: user.id,
        email: user.email,
      };

      // Generate JWT token
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); // token will expire after 8 hours

      // Log the token in the backend terminal
      console.log("Generated Token:", token);

      // Set cookie options
      const tokenOption = {
        httpOnly : true,
        secure : true,
        sameSite : 'None'
      }

      // Send token as a cookie and return response with token data
      res.cookie("token", token, tokenOption).json({
        message: "Login Successfully",
        data: tokenData,
        success: true,
        error: false,
        token, // Include the token in the response
      });
    } else {
      throw new Error("Invalid password, please check your password");
    }

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
