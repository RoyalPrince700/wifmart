const addToCartModel = require('../../models/cartProduct');
const checkoutModel = require('../../models/checkoutModel'); // Adjust the path if needed

const createCheckout = async (req, res) => {
  try {
    console.log('Incoming payload:', req.body);

    const { name, number, address, cartItems, totalPrice, paymentMethod, note } = req.body;

    // Improved validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!name || !number || !address || !Array.isArray(cartItems) || !cartItems.length || typeof totalPrice !== 'number' || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing fields',
      });
    }
    if (!phoneRegex.test(number)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format',
      });
    }

    // Create new checkout
    const newCheckout = new checkoutModel({
      name,
      number,
      address,
      cartItems,
      totalPrice,
      paymentMethod,
      note: note || '',
      userId: req.userId, // Ensure userId is included
    });

    const savedCheckout = await newCheckout.save();

    // If checkout is successfully saved, clear the user's cart
    if (savedCheckout?._id) {
      console.log('Clearing cart for user:', req.userId);
      const deleteCartItem = await addToCartModel.deleteMany({ userId: req.userId });
      console.log('Deleted cart items:', deleteCartItem);
    }

    res.status(201).json({
      success: true,
      message: 'Checkout created successfully',
      data: savedCheckout,
    });
  } catch (error) {
    console.error('Error creating checkout:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message || error,
    });
  }
};

module.exports = createCheckout;
