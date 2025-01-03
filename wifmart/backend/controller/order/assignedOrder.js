const orderModel = require("../../models/checkoutModel");


const assignedOrdersController = async (req, res) => {
    try {
        const assignedOrders = await orderModel
            .find({ assignedTo: { $exists: true, $ne: null } }) // Filter only assigned orders
            .populate("assignedTo", "email") // Populate only email field
            .sort({ createdAt: -1 });

        res.json({
            data: assignedOrders,
            message: "Assigned Orders fetched successfully",
            success: true,
            error: false,
        });
    } catch (error) {
        console.error("Error fetching assigned orders:", error);
        res.status(500).json({
            message: error.message || "Internal Server Error",
            success: false,
            error: true,
        });
    }
};

module.exports = assignedOrdersController;
