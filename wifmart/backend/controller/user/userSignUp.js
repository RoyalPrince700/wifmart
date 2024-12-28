const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");
const { sendVerificationEmail } = require("../../mailtrap/emails");

async function userSignUpController(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password ) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const userAlreadyExists = await userModel.findOne({ email: normalizedEmail });

    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new userModel({
      email: normalizedEmail,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "8h" });

    // Set the cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    // Send verification email
    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error in verifying Email:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = userSignUpController;




// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const userModel = require("../../models/userModel");

// async function userSignUpController(req, res) {
//     try {
//         const { email, password } = req.body;

//         if (!email) {
//             return res.json({ message: 'Please provide an email', error: true, success: false });
//         }
//         if (!password) {
//             return res.json({ message: 'Please provide a password', error: true, success: false });
//         }

//         // Normalize email to lowercase
//         const normalizedEmail = email.trim().toLowerCase();

//         // Check if user already exists
//         const existingUser = await userModel.findOne({ email: normalizedEmail });
//         if (existingUser) {
//             return res.json({ message: 'User already exists', error: true, success: false });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create the new user
//         const newUser = await userModel.create({
//             email: normalizedEmail,
//             password: hashedPassword,
//         });

//         // Generate JWT token
//         const tokenData = {
//             _id: newUser._id,
//             email: newUser.email,
//         };
//         const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

//         // Set token in a secure cookie
//         // Set cookie options
//       const tokenOption = {
//         httpOnly : true,
//         secure : true,
//         sameSite : 'None'
//       }
//         res.cookie("token", token, tokenOption).json({
//             message: "Signup and login successful",
//             data: tokenData,
//             success: true,
//             error: false,
//         });
//     } catch (err) {
//         res.json({
//             message: err.message || err,
//             error: true,
//             success: false,
//         });
//     }
// }

// module.exports = userSignUpController;
