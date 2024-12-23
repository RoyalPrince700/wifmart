const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel'); // Ensure this path is correct

async function UserSignUpController(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'User with this email already exists', 
                error: true, 
                success: false 
            });
        }

        // Validate required fields
        if (!email || !password ) {
            return res.status(400).json({ 
                message: 'Please provide email, password,', 
                error: true, 
                success: false 
            });
        }

        // Hash the password
         const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user payload
        const payload = {
            ...req.body,     // Includes all fields such as email, , location, hostel
            role: "GENERAL", // Default role
            password: hashedPassword, // Overwrite the plain password with the hashed one
        };

        // Save user to database
        const userData = new userModel(payload);
        const savedUser = await userData.save();

        // Remove password from the response object for security
        const { password: _, ...userWithoutPassword } = savedUser.toObject();

        // Respond with success message and user details (excluding password)
        return res.status(201).json({
            data: userWithoutPassword,  // User data without the password field
            success: true,
            error: false,
            message: 'User created successfully',
        });

    } catch (err) {
        // Catch and handle any errors
        return res.status(500).json({
            message: err.message || 'Server error',
            error: true,
            success: false,
        });
    }
}

module.exports = UserSignUpController;
