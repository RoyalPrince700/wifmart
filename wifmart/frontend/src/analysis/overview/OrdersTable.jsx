import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import SummaryApi from "../../common";
import displayNARCurrency from "../../helpers/displayCurrency";
import ChangeOrderStatus from "../../components/ChangeOrderStatus";

const OrdersTable = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const [currentOrderDetails, setCurrentOrderDetails] = useState({
    orderId: "",
    currentStatus: "",
  });

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await fetch(SummaryApi.assignedOrders.url, {
        method: SummaryApi.assignedOrders.method,
        credentials: "include",
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllOrders(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Update order status
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
      console.error("Update Error:", error);
      toast.error("Failed to update order status.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th>#</th>
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
                <td>
                  <div className="relative group">
                    <span
                      className="truncate w-16 inline-block overflow-hidden whitespace-nowrap"
                      title={order._id}
                    >
                      {order._id.slice(0, 3)}...
                    </span>
                    <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded p-2 z-10">
                      {order._id}
                    </div>
                  </div>
                </td>
                <td>{order.status}</td>
                <td>{moment(order.createdAt).format("LL")}</td>
                <td className="flex space-x-2">
                  <button
                    className="bg-gray-700 px-4 py-2 rounded hover:bg-blue-500 hover:text-white"
                    onClick={() =>
                      setExpandedOrderId(
                        expandedOrderId === order._id ? null : order._id
                      )
                    }
                  >
                    {expandedOrderId === order._id ? "Hide" : "Details"}
                  </button>
                  <button
                    className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-500 hover:text-white"
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
                    <div className="bg-gray-700 p-4">
                      <p>
                        <strong>Customer Name:</strong> {order.name || "Unknown"}
                      </p>
                      <p>
                        <strong>Phone Number:</strong> {order.number || "N/A"}
                      </p>
                      <p>
                        <strong>Address:</strong> {order.address || "N/A"}
                      </p>
                      <p>
                        <strong>Note:</strong> {order.note || "N/A"}
                      </p>
                      <p>
                        <strong>Total Price:</strong>{" "}
                        {displayNARCurrency(order.totalPrice.toFixed(2))}
                      </p>
                      <h4 className="font-bold mt-4">Cart Items:</h4>
                      <ul>
                        {order.cartItems.map((item, idx) => (
                          <li key={idx}>
                            <p>
                              {item.productId?.productName || "Unknown"}
                            </p>
                            {item.productId?.productImage?.[0] && (
                              <img
                                src={item.productId.productImage[0]}
                                alt={item.productId.productName}
                                className="w-16 h-16 object-cover"
                              />
                            )}
                            <p>Quantity: {item.quantity}</p>
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
        <p className="text-center text-gray-500">No orders found.</p>
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

export default OrdersTable;
