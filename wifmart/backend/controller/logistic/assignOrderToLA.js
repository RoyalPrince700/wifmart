const Checkout = require('../../models/checkoutModel'); // Import your checkout model

const assignOrderToLA = async (req, res) => {
    try {
        console.log("Request received:", req.body); // Log the request body for debugging

        const { userId } = req.body;

        // Validate the userId in the request
        if (!userId) {
            console.log("Error: UserId is missing in the request.");
            return res.status(400).json({ success: false, message: "UserId is required" });
        }

        // Find and update the first unassigned pending order
        const updatedOrder = await Checkout.findOneAndUpdate(
            { status: "Pending", assignedTo: null }, // Filter: Pending and unassigned orders
            { assignedTo: userId }, // Assign to the specified user
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            console.log("No pending orders available to assign.");
            return res.status(404).json({ success: false, message: "No pending orders available" });
        }

        console.log("Order successfully assigned:", {
            orderId: updatedOrder._id,
            assignedTo: updatedOrder.assignedTo,
        });

        // Respond with success and the updated order details
        res.status(200).json({
            success: true,
            message: "Order assigned successfully",
            data: updatedOrder,
        });
    } catch (error) {
        console.error("Error in assignOrderToLA:", error); // Log the error
        res.status(500).json({ success: false, message: "An error occurred during order assignment" });
    }
};

module.exports = assignOrderToLA;
