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
    },isVerified: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
	
  },
  {
    timestamps: true,
  }
);

// Ensure case-insensitive uniqueness for email
userSchema.path('email').index({ unique: true });

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;


// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       unique: true,
//       required: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       default: 'GENERAL',
//     },
//     status: {
//       type: String,
//       enum: ['Active', 'Inactive', 'Suspended'],
//       default: 'Active',
//     },
//     location: {
//       type: String,
//       default: 'Not Specified',
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     resetPasswordToken: String,
//     resetPasswordExpiresAt: Date,
//     verificationToken: String,
//     verificationTokenExpiresAt: Date,
//   },
//   {
//     timestamps: true,
//   }
// );

// // Case-insensitive uniqueness for email
// userSchema.index({ email: 1 }, { unique: true });

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // Method to check token expiry
// userSchema.methods.isTokenExpired = function (tokenType) {
//   const expiryField = tokenType === 'verification' ? 'verificationTokenExpiresAt' : 'resetPasswordExpiresAt';
//   return this[expiryField] && this[expiryField] < Date.now();
// };

// const userModel = mongoose.model('User', userSchema);
// module.exports = userModel;
