import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import AssignLA from "../components/AssignLA";

const HRAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [activeLAs, setActiveLAs] = useState([]); // State to store active LAs

  // Fetch all orders from the backend
  const fetchAllOrders = async () => {
    try {
      const response = await fetch(SummaryApi.allOrders.url, {
        method: SummaryApi.allOrders.method,
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  // Fetch active LAs
  const fetchActiveLAs = async () => {
    try {
      const response = await fetch(SummaryApi.getActiveLA.url, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setActiveLAs(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch active LAs.");
    }
  };

  // Assign order to an LA and update the UI
  const handleAssignOrder = async (orderId, userId) => {
    console.log("Assigning order to userId:", userId);
    if (!userId) {
      console.error("No userId provided to handleAssignOrder");
      return toast.error("Failed to assign order. Please select a Logistics Attendant.");
    }

    try {
      const response = await fetch(SummaryApi.assignLA.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, orderId }), // Include orderId in the payload
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Order successfully assigned.");
        // Update the UI with the assigned LA
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, assignedLA: activeLAs.find((la) => la.id === userId) }
              : order
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error assigning order:", error);
      toast.error("Failed to assign order.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
    fetchActiveLAs(); // Fetch active LAs on component mount
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="bg-white p-4 shadow rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Assigned LA</th>
              <th className="p-2 text-left">Assign</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.customerName}</td>
                <td className="p-2">
                  {order.assignedLA ? order.assignedLA.name : "Not Assigned"}
                </td>
                <td className="p-2">
                  <AssignLA
                    orderId={order.id} // Pass the order ID
                    currentLA={order.assignedLA}
                    activeLAs={activeLAs}
                    onAssign={(userId) => handleAssignOrder(order.id, userId)} // Include orderId in the handler
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRAllOrders;
