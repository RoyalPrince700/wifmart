const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    name: String,
    number: String,
    address: String,
    note: String,
    cartItems: Array,
    totalPrice: Number,
    paymentMethod: String,
    status: {
        type: String,
        default: "Pending"
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who placed the order
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Logistics Associate
}, {
    timestamps: true
});

const Checkout = mongoose.model('Checkout', checkoutSchema);
module.exports = Checkout;
