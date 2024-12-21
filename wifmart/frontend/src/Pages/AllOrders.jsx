import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import displayNARCurrency from '../helpers/displayCurrency';
import ChangeOrderStatus from "../components/ChangeOrderStatus";



const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [statuses, setStatuses] = useState({}); // Track statuses for inline edits
        const [openChangeStatus, setOpenChangeStatus] = useState(false);
    
      const [currentOrderDetails, setCurrentOrderDetails] = useState({
            orderId: "",
            currentStatus: "",
        });

    // Fetch all orders from the backend
    const fetchAllOrders = async () => {
        try {
            const response = await fetch(SummaryApi.allOrders.url, {
                method: SummaryApi.allOrders.method,
                credentials: "include",
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                console.log("Fetched Orders:", dataResponse.data); // Debugging log
                setAllOrders(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error("Fetch Error:", error); // Debugging log
            toast.error("Failed to fetch orders.");
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    // Handle status change submission
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(SummaryApi.updateOrder.url, {
                method: SummaryApi.updateOrder.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId, status: newStatus }),
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                toast.success("Order status updated successfully.");
                fetchAllOrders(); // Refresh the orders list
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error("Update Error:", error); // Debugging log
            toast.error("Failed to update order status.");
        }
    };

    return (
        <div className="pb-4 bg-white mt-[120px]">
            <h2 className="text-lg font-bold py-2 px-4">All Orders</h2>
            <table className="w-full orderTable">
                <thead>
                    <tr className="bg-black text-white">
                        <th>Sr.</th>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Order Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders.map((order, index) => (
                        <React.Fragment key={order._id || index}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{order._id}</td>
                                <td>{order.status}</td>
                                <td>{moment(order.createdAt).format("LL")}</td>
                                <td>
                                    <button
                                        className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                                        onClick={() =>
                                            setExpandedOrderId(
                                                expandedOrderId === order._id ? null : order._id
                                            )
                                        }
                                    >
                                        {expandedOrderId === order._id ? "Hide" : "View"}
                                    </button>
                                </td>
                                <td>
                                <button
                                    className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                                    onClick={() => {
                                        setCurrentOrderDetails({
                                            orderId: order._id,
                                            currentStatus: order.status,
                                        });
                                        setOpenChangeStatus(true);
                                    }}
                                >
                                    Change Status
                                </button>
                            </td>
                            </tr>
                            {expandedOrderId === order._id && (
                                <tr>
                                    <td colSpan={5}>
                                        <div className="p-4 bg-gray-100">
                                            <h3 className="font-bold text-lg mb-2">Order Details</h3>
                                            <p><strong>Customer Name:</strong> {order.name || "Unknown"}</p>
                                            <p><strong>Phone Number:</strong> {order.number || "N/A"}</p>
                                            <p><strong>Address:</strong> {order.address || "N/A"}</p>
                                            <p><strong>Note:</strong> {order.note || "N/A"}</p>
                                            <p><strong>Total Price:</strong> {displayNARCurrency(order.totalPrice.toFixed(2))}</p>


                                            <h3 className="font-bold text-lg mt-4">Cart Items</h3>
                                            <ul className="list-disc pl-4">
                                                {order.cartItems.map((item, idx) => (
                                                    <li key={idx}>
                                                        <p>
                                                            <strong>Product Name:</strong>{" "}
                                                            {item.productId?.productName || "Unknown"}
                                                        </p>
                                                        {item.productId?.productImage?.[0] && (
                                                            <img
                                                                src={item.productId.productImage[0]}
                                                                alt={item.productId.productName}
                                                                className="w-16 h-16 object-cover"
                                                            />
                                                        )}
                                                        <p>
                                                            <strong>Quantity:</strong> {item.quantity}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>

                                           
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {allOrders.length === 0 && (
                <p className="text-center text-gray-500 py-4">No orders available.</p>        
            )}
              {openChangeStatus && (
                <ChangeOrderStatus
                    orderId={currentOrderDetails.orderId}
                    currentStatus={currentOrderDetails.currentStatus}
                    onClose={() => setOpenChangeStatus(false)}
                    callFunc={fetchAllOrders}
                />
            )}
        </div>
    );
};

export default AllOrders;
