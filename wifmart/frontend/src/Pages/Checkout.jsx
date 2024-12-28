import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import displayNARCurrency from '../helpers/displayCurrency';
import { toast } from 'react-toastify';
import Context from '../context';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchUserAddToCart } = useContext(Context);

  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  const shippingFee = totalPrice < 10000 ? 300 : 500;
  const totalWithShipping = totalPrice + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <p className="text-xl font-medium">No items in the cart. Please go back to add items.</p>
        <button
          className="mt-5 px-5 py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-800 transition-all duration-300"
          onClick={() => navigate('/cart')}
        >
          Back to Cart
        </button>
      </div>
    );
  }

  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    number: '',
    address: '',
    note: '',
  });

  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const validateShippingDetails = () => {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!shippingDetails.name || !shippingDetails.number || !shippingDetails.address) {
      toast.error('Name, Phone Number, and Address are required.');
      return false;
    }
    if (!phoneRegex.test(shippingDetails.number)) {
      toast.error('Invalid phone number format.');
      return false;
    }
    return true;
  };

  const handlePayOnDelivery = async () => {
    if (!validateShippingDetails()) return;

    try {
      const payload = {
        name: shippingDetails.name,
        number: shippingDetails.number,
        address: shippingDetails.address,
        note: shippingDetails.note || '',
        cartItems,
        totalPrice: totalWithShipping,
        paymentMethod: 'Pay on Delivery',
      };

      const response = await fetch(SummaryApi.checkout.url, {
        method: SummaryApi.checkout.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to process order');

      toast.success('Your order has been placed successfully!');
      await fetchUserAddToCart();
      navigate('/payondeliveryorder', { state: { number: shippingDetails.number } });
    } catch (error) {
      console.error('Error during Pay on Delivery:', error);
      toast.error('Error processing your order. Please try again.');
    }
  };

  return (
    <div className="container px-4 mx-auto mt-[100px] lg:mt-[120px]">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
      <div className="mb-10">
        <h2 className="text-xl font-medium mb-4">Shipping Details</h2>
        <input
          type="text"
          name="name"
          value={shippingDetails.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="block w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg"
        />
        <input
          type="tel"
          name="number"
          value={shippingDetails.number}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="block w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg"
        />
        <textarea
          name="address"
          value={shippingDetails.address}
          onChange={handleChange}
          placeholder="Complete Address"
          required
          className="block w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg"
        />
        <textarea
          name="note"
          value={shippingDetails.note}
          onChange={handleChange}
          placeholder="Leave a note (optional)"
          className="block w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg"
        />
      </div>

      <div className="mb-10 bg-white shadow-lg rounded-lg p-6">
  <h2 className="text-xl font-medium mb-6 border-b pb-3">Order Summary</h2>
  <div className="flex justify-between items-center mb-4">
    <span className="text-lg text-gray-700">Items in Cart:</span>
    <span className="text-lg font-medium">{cartItems.length}</span>
  </div>
  <div className="flex justify-between items-center mb-4">
    <span className="text-lg text-gray-700">Total Price:</span>
    <span className="text-lg font-medium">{displayNARCurrency(totalPrice.toFixed(2))}</span>
  </div>
  <div className="flex justify-between items-center mb-4">
    <span className="text-lg text-gray-700">Shipping Fee:</span>
    <span className="text-lg font-medium">{displayNARCurrency(shippingFee)}</span>
  </div>
  <div className="flex justify-between items-center border-t pt-4">
    <span className="text-lg text-gray-800 font-semibold">Total with Shipping:</span>
    <span className="text-lg text-yellow-600 font-bold">{displayNARCurrency(totalWithShipping.toFixed(2))}</span>
  </div>
</div>


      <div className="flex flex-col sm:flex-row gap-4 my-3">
        <button
          className="bg-yellow-600 text-white font-medium px-5 py-3 rounded-lg hover:bg-yellow-700 transition-all duration-300 ease-in-out"
          onClick={handlePayOnDelivery}
        >
          Pay on Delivery
        </button>
        <button
          className="bg-gray-300 text-gray-700 font-medium px-5 py-3 rounded-lg cursor-not-allowed"
          disabled
        >
          Pay with Card (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default Checkout;
