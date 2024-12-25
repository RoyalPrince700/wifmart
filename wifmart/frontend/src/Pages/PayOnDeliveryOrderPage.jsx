import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayNARCurrency from '../helpers/displayCurrency';

const PayOnDeliveryOrders = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      console.log('Fetching order details...');
      const response = await fetch(SummaryApi.payondeliveryorder.url, {
        method: SummaryApi.payondeliveryorder.method,
        credentials: 'include',
      });

      const responseData = await response.json();
      console.log('API Response:', responseData);

      if (responseData.success) {
        setData(responseData.data);
      } else {
        console.error('Failed to fetch orders:', responseData.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="container mx-auto mt-[100px] lg:mt-[120px]  px-4">
      <h1 className="text-2xl font-bold mb-5">My Orders</h1>
      {!data.length ? (
        <p className="text-center text-lg text-gray-500">No orders available.</p>
      ) : (
        <div className="space-y-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow rounded-lg p-6 border border-gray-200"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order Placed: {moment(item.createdAt).format('LL')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: <span className="font-semibold">{item.status}</span>
                  </p>
                </div>
                <p className="text-lg font-semibold">
                  Total: {displayNARCurrency(item.totalPrice)}
                </p>
              </div>

              {/* Order Items */}
              <div className="grid gap-4">
                {item.cartItems.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <img
                      src={product.productId.productImage[0]}
                      alt={product.productId.productName}
                      className="w-20 h-20 object-contain border rounded-lg"
                    />
                    <div className="ml-4">
                      <p className="text-[14px] lg:text-xl  text-ellipsis line-clamp-1">
                        {product.productId.productName}
                      </p>
                      <p className="capitalize text-[12px] text-slate-500">
                        Quantity: {product.quantity}
                      </p>
                      <p className="capitalize text-[12px] text-slate-500">
                        Price: {displayNARCurrency(
                          product.productId.sellingPrice
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Details */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-1">Shipping Address</h3>
                <p className="text-sm text-gray-600">{item.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PayOnDeliveryOrders;
