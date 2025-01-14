const orderModel = require("../../models/checkoutModel");
const NotificationModel = require("../../models/notification"); // Import notification model

async function updateOrderStatus(req, res) {
    console.log("Request User ID:", req.userId);
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({
                message: "Order ID and status are required",
                success: false,
                error: true,
            });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: "Order not found",
                success: false,
                error: true,
            });
        }

        // Create a notification for the user
        const userNotification = new NotificationModel({
            userId: updatedOrder.userId, // Assuming the order model has a userId field
            type: "Order Status Update",
            message: `The status of your order #${updatedOrder._id} has been updated to: ${status}.`,
            isRead: false,
            createdAt: new Date(),
        });

        await userNotification.save();

        res.json({
            data: updatedOrder,
            message: "Order status updated successfully, and notification sent to the user.",
            success: true,
            error: false,
        });
    } catch (error) {
        console.error("Error in updateOrderStatus:", error);
        res.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        });
    }
}

module.exports = updateOrderStatus;
