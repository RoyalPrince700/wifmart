import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import displayNARCurrency from '../helpers/displayCurrency';
import { toast } from 'react-toastify';
import Context from '../context';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fetchUserAddToCart } = useContext(Context); // Use context to update cart count

    const cartItems = location.state?.cartItems || [];
    const totalPrice = location.state?.totalPrice || 0;

    // Calculate shipping fee
    const shippingFee = totalPrice < 10000 ? 300 : 500;
    const totalWithShipping = totalPrice + shippingFee;

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto mt-10 text-center">
                <p className="text-lg font-medium">No items in the cart. Please go back to add items.</p>
                <button
                    className="mt-5 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 transition"
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
                totalPrice: totalWithShipping, // Include shipping fee
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
            await fetchUserAddToCart(); // Update cart count
            navigate('/payondeliveryorder', { state: { number: shippingDetails.number } });
        } catch (error) {
            console.error('Error during Pay on Delivery:', error);
            toast.error('Error processing your order. Please try again.');
        }
    };

    return (
        <div className="container px-4 mx-auto mt-[100px] lg:mt-[120px]">
            <h1 className="text-2xl mb-5">Checkout</h1>
            <div className="mb-5">
                <h2 className="text-lg">Shipping Details</h2>
                <input
                    type="text"
                    name="name"
                    value={shippingDetails.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-3"
                />
                <input
                    type="number"
                    name="number"
                    value={shippingDetails.number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-3"
                />
                <textarea
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-3"
                />
                <textarea
                    name="note"
                    value={shippingDetails.note}
                    onChange={handleChange}
                    placeholder="Leave a note (optional)"
                    className="block w-full p-2 border border-gray-300 rounded mb-3"
                />
            </div>
            <div className="mb-5">
                <h2 className="text-lg">Order Summary</h2>
                <p>Items in Cart: {cartItems.length}</p>
                <p>Total Price: {displayNARCurrency(totalPrice.toFixed(2))}</p>
                <p>Shipping Fee: {displayNARCurrency(shippingFee)}</p>
                <p>Total with Shipping: {displayNARCurrency(totalWithShipping.toFixed(2))}</p>
            </div>
            <div className="sm:flex-col lg:flex ">
                <button
                    className="bg-red-600 mb-3 text-white px-4 py-2 rounded hover:bg-red-800 transition"
                    onClick={handlePayOnDelivery}
                >
                    Pay on Delivery
                </button>
                <button
                    className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                    disabled
                >
                    Pay with Card (Coming Soon)
                </button>
            </div>
        </div>
    );
};
export default Checkout;
