import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import Context from '../context';
import displayNARCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context); // data of cart is coming from here
    const loadingCart = new Array(context.cartProductCount).fill(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
        }
    };

    const handleLoading = async () => {
        await fetchData();
    };

    useEffect(() => {
        setLoading(true);
        handleLoading();
        setLoading(false);
    }, []);

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                _id: id, // Send the product's _id
                quantity: qty + 1, // Increase the quantity
            }),
        });

        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    _id: id, // Send the product's _id
                    quantity: qty - 1, // Decrease the quantity
                }),
            });

            const responseData = await response.json();
            if (responseData.success) {
                fetchData();
            }
        }
    };

    const deleteCartProduct = async (id) => {
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    _id: id, // Send the product's _id
                }),
            });

            const responseData = await response.json();
            if (responseData.success) {
                fetchData();
                context.fetchUserAddToCart();
            }
        } catch (error) {
            console.error('Error deleting product from cart:', error);
        }
    };

    const totalQty = data.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity,
        0
    );
    const totalPrice = data.reduce(
        (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
        0
    );
    
    const handleCheckout = () => {
        if (data.length > 0) {
            navigate('/checkout', {
                state: {
                    cartItems: data,
                    totalPrice: totalPrice,
                },
            });
        } else {
            alert('No items in the cart. Please add items to proceed.');
        }
    };
    

    return (
        <div className=' px-4 mx-auto mt-[100px] lg:mt-[120px]'>
            <h1 className="text-2xl px-4 ">My Cart</h1>

            <div className='text-center text-lg '>
                {data.length === 0 && !loading && <p className='bg-white py-5'>No Data</p>}
            </div>

            <div className='flex flex-col p-4 lg:flex-row gap-10 lg:justify-between'>
                <div className='w-full max-w-3xl'>
                    {loading
                        ? loadingCart.map((_, index) => (
                              <div
                                  key={index}
                                  className='w-full bg-slate-200 h-32 border border-slate-300 my-2 animate-pulse rounded'></div>
                          ))
                        : data.map((product) => (
                              <div
                                  key={product?._id}
                                  className='w-full bg-white lg:h-32 h-44 border border-slate-300 my-2 rounded grid grid-cols-[128px,1fr]'>
                                  <div className='w-32 h-full bg bg-slate-200'>
                                      <img
                                          src={product?.productId?.productImage[0]}
                                          className='w-full h-44 lg:h-32 object-scale-down mix-blend-multiply'
                                      />
                                  </div>
                                  <div className='px-4 py-2 relative'>
                                      <div
                                          className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'
                                          onClick={() => deleteCartProduct(product?._id)}>
                                          <MdDelete />
                                      </div>
                                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>
                                          {product?.productId?.productName}
                                      </h2>
                                      <p className='capitalize text-slate-500'>
                                          {product?.productId?.category}
                                      </p>
                                      <div className='flex mb-4 lg:mb-1 flex-col lg:flex-row lg:items-center  lg:justify-between'>
                                          <p className='text-black font-medium text-lg'>
                                              {displayNARCurrency(product?.productId?.sellingPrice)}
                                          </p>
                                          <p className='text-slate-600 font-semibold text-lg'>
                                              {displayNARCurrency(
                                                  product?.productId?.sellingPrice * product?.quantity
                                              )}
                                          </p>
                                      </div>
                                      <div className='flex items-center gap-3 mt-1'>
                                          <button
                                              className='flex rounded hover:bg-red-600 hover:text-white justify-center items-center border w-6 h-6 border-red-600 text-red-600'
                                              onClick={() => decreaseQty(product?._id, product?.quantity)}>
                                              -
                                          </button>
                                          <span>{product?.quantity}</span>
                                          <button
                                              className='flex rounded hover:bg-red-600 hover:text-white justify-center items-center border w-6 h-6 border-red-600 text-red-600'
                                              onClick={() => increaseQty(product?._id, product?.quantity)}>
                                              +
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>

                {data[0] && (
                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {loading ? (
                            <div className='lg:h-36  bg-slate-200 border border-slate-300 animate-pulse'></div>
                        ) : (
                            <div className='h-36 bg-red-50'>
                                <h2 className='text-black px-4 py-1'>Summary</h2>
                                <div className='flex items-center justify-between px-4 font-medium text-lg text-slate-600 gap-2'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>
                                <div className='flex font-medium text-lg text-slate-600 items-center justify-between px-4 gap-2'>
                                    <p>Total Price</p>
                                    <p>{displayNARCurrency(totalPrice)}</p>
                                </div>
                                <button
                                    className='bg-red-600 p-2 text-white w-full'
                                    onClick={handleCheckout}>
                                    Checkout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
