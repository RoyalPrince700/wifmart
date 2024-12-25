const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require("../../models/userModel");

async function userSignUpController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.json({ message: 'Please provide an email', error: true, success: false });
        }
        if (!password) {
            return res.json({ message: 'Please provide a password', error: true, success: false });
        }

        // Normalize email to lowercase
        const normalizedEmail = email.trim().toLowerCase();

        // Check if user already exists
        const existingUser = await userModel.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.json({ message: 'User already exists', error: true, success: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await userModel.create({
            email: normalizedEmail,
            password: hashedPassword,
        });

        // Generate JWT token
        const tokenData = {
            _id: newUser._id,
            email: newUser.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

        // Set token in a secure cookie
        // Set cookie options
      const tokenOption = {
        httpOnly : true,
        secure : true,
        sameSite : 'None'
      }
        res.cookie("token", token, tokenOption).json({
            message: "Signup and login successful",
            data: tokenData,
            success: true,
            error: false,
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
