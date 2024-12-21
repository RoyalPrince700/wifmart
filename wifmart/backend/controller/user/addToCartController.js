const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body; // Get product ID from request body
    const currentUser = req?.userId;  // Get user ID from authToken middleware

    // If user is not authenticated, send login prompt
    if (!currentUser) {
      return res.status(401).json({
        message: "Please Login to add items to your cart.",
        success: false,
        error: true
      });
    }

    // Check if the product is already in the user's cart
    const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

    if (isProductAvailable) { // If product already in cart, show error
      return res.json({
        message: "Already Added to Cart",
        success: false,
        error: true
      });
    }

    // Create payload for new cart entry
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    // Add product to cart and save to database
    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    res.json({
      data: saveProduct,
      message: "Product Added",
      success: true,
      error: false
    });

  } catch (err) {
    // Catch any errors and return a response
    res.status(500).json({
      message: err?.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = addToCartController;


/*const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body; // Get productId from the request body
    const currentUser = req.userId; // Get userId from the request (set by authToken middleware)

    // Check if the product is already in the user's cart
    const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

    if (isProductAvailable) { // If the product is already in the cart, show an error
      return res.json({
        message: "Already Added to Cart",
        success: false,
        error: true,
      });
    }

    // Create a payload to add the product to the cart
    const payload = {
      productId,
      quantity: 1,
      userId: currentUser,
    };

    // Add the product to the cart if not already present
    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    // Respond with a success message
    return res.json({
      data: saveProduct,
      message: "Product Added",
      success: true,
      error: false,
    });
  } catch (err) {
    // Catch any errors and return an error message
    return res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;*/



/*const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req,res) =>{
    try{
        const {productId} = req?.body //get user id of the product
        const currentUser = req?.userId //userid of the user

        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

        //const isProductAvailable = await addToCartModel.find({productId}) //checking if the productid is already in the data

        if(isProductAvailable){ //if available show error
            return res.json({
                message : "Already Added to Cart",
                success : false,
                error : true
            })
        }


        const payload = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newAddToCart = new addToCartModel(payload) //added the cart to database if not in cart and the message
        const saveProduct = await newAddToCart.save()

        res.json({
            data : saveProduct,
            message : "Product Added",
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = addToCartController*/