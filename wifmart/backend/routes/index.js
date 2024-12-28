const express = require('express');
const router = express.Router();

const authToken = require('../middleware/authToken');

const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const uploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const paymentController = require('../controller/order/paymentController');
const webhooks = require('../controller/order/webhooks');
const orderController = require('../controller/order/orderController');
const UserSignUpController = require('../controller/user/userSignUp');
const allOrdersController = require('../controller/order/allOrders');
const deleteProductController = require('../controller/product/deleteProduct');
const placeFoodOrder = require('../controller/food/foodOrderController');
const getFoodMenuController = require('../controller/food/getFoodMenuController');
const getSubCategoryWiseProduct = require('../controller/product/getSubCategoryWiseProduct');
const getSubCategoryProduct = require('../controller/product/getSubCategoryProductOne');
const getProductStatusWise = require('../controller/product/getProductStatusWise');
const getProductStatus = require('../controller/product/getProductStatus');
const getHotDealWiseProduct = require('../controller/product/getHotDealWise');
const createCheckout = require('../controller/order/checkoutController');
const getUserOrders = require('../controller/order/getUserOrder');
const updateOrderStatus = require('../controller/order/updateOrderStatus');
const allLogisticsAssociates = require('../controller/user/allLogisticAttendant');
const updateLogisticsAttendant = require('../controller/user/updateLogisticsAttendants');
const assignOrderToLA = require('../controller/logistic/assignOrderToLA');
const getActiveLogisticsAssociates = require('../controller/logistic/getActiveLA');
const getOrderForLA = require('../controller/logistic/getOrderforLA');
const getActiveLAs = require('../controller/logistic/getActiveLA');
const verifyEmailController = require('../controller/user/verifyEmail');
const forgotPassword = require('../controller/user/forgotPassword');
const resetPassword = require('../controller/user/resetPassword');
const checkAuth = require('../controller/user/checkAuth');

// Authentication routes
router.post("/signup", UserSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.post("/verify-email", verifyEmailController)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", authToken, checkAuth )

// Token verification route
router.get("/auth/verify", authToken, (req, res) => {
    try {
        // If authToken middleware sets req.userId, the token is valid
        if (req.userId) {
            return res.status(200).json({
                success: true,
                message: 'Token verified successfully!',
                userId: req.userId, // Pass the user ID to the response
            });
        }

        // If req.userId is not set, return an unauthorized response
        res.status(401).json({
            success: false,
            message: 'Unauthorized access. Please login.',
        });
    } catch (err) {
        // Catch unexpected errors and respond with an appropriate status code
        console.error("Error in /auth/verify route:", err.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});


// Admin panel
router.get("/all-users", authToken, allUsers);
router.get("/all-logistics-associate", authToken, allLogisticsAssociates);
router.get("/get-active-logistics-associate", authToken, getActiveLAs);


router.get("/all-orders", authToken, allOrdersController);

router.post("/update-user", authToken, updateUser);
router.post("/update-logistics-attendants", authToken, updateLogisticsAttendant);
router.post("/assign-logistics-attendants", authToken, assignOrderToLA);
router.get("/get-order-logistics-attendants", authToken, getOrderForLA);




router.post("/update-user-order", authToken, updateOrderStatus);

router.post("/delete-uploaded-product", authToken, deleteProductController);
router.post('/api/place-food-order', authToken, placeFoodOrder);

// Food menu route
router.get('/api/food-menu', getFoodMenuController);

// Upload product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.get("/get-sub-categoryProduct", getSubCategoryProduct);
router.get("/get-hot-dealProduct", getHotDealWiseProduct);
router.get("/get-product-status", getProductStatus);

router.post("/category-product", getCategoryWiseProduct);
router.post("/sub-category-product", getSubCategoryWiseProduct);
router.post("/hot-deal-product", getHotDealWiseProduct);
router.post("/product-status", getProductStatusWise);

router.post("/product-details", getProductDetails);



router.post('/checkout', authToken, createCheckout); // Create checkout

// User add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/viewCartProduct", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);
router.get('/payondelivery-orders', authToken, getUserOrders);

// Payment and order
router.post("/process-payment", authToken, paymentController);
router.post("/webhook", webhooks);
router.get("/order-list", authToken, orderController);

module.exports = router;
