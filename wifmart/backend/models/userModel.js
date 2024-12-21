const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true, // Automatically convert email to lowercase
      trim: true, // Remove leading/trailing whitespace
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'GENERAL',
    },
    status: {
      type: String,
      default: 'Active', // Default status
    },
    location: {
      type: String,
      default: 'Not Specified', // Default location
    },
  },
  {
    timestamps: true,
  }
);

// Ensure case-insensitive uniqueness for email
userSchema.path('email').index({ unique: true });

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
