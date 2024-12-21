const orderModel = require("../../models/checkoutModel");

const allOrdersController = async (req, res) => {
    try {
        const allOrders = await orderModel
            .find()
            .sort({ createdAt: -1 })
            .populate("cartItems.productId", "productName productImage sellingPrice") // Correct product fields
            .populate("userId", "name email address number"); // Populate user details

        // Debugging: Log orders to verify fields
        console.log("Fetched Orders:", JSON.stringify(allOrders, null, 2));

        res.json({
            data: allOrders,
            message: "All Orders",
            success: true,
            error: false,
        });
    } catch (error) {
        console.error("Error in allOrdersController:", error); // Debugging
        res.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        });
    }
};

module.exports = allOrdersController;
