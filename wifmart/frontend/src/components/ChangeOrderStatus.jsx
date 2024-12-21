import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import ORDER_STATUS from "../common/orderStatus";

const ChangeOrderStatus = ({ orderId, currentStatus, onClose, callFunc }) => {
    const [orderStatus, setOrderStatus] = useState(currentStatus);

    const handleStatusChange = (e) => {
        setOrderStatus(e.target.value);
    };

    const updateOrderStatus = async () => {
        try {
            const response = await fetch(SummaryApi.updateOrder.url, {
                method: SummaryApi.updateOrder.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId, status: orderStatus }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                callFunc(); // Refresh the orders list
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error("Failed to update order status.");
        }
    };

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-40">
            <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
                <button className="block ml-auto" onClick={onClose}>
                    <IoMdClose />
                </button>
                <h1 className="pb-4 text-lg font-medium">Change Order Status</h1>
                <p>Order ID: {orderId}</p>

                <div className="flex items-center justify-between my-4">
                    <p>Status</p>
                    <select
                        className="border px-4 py-1"
                        value={orderStatus}
                        onChange={handleStatusChange}
                    >
                        {Object.values(ORDER_STATUS).map((status) => (
                            <option value={status} key={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="w-fit text-white hover:bg-red-700 cursor-pointer bg-red-600 mx-auto block py-1 px-3 rounded-full"
                    onClick={updateOrderStatus}
                >
                    Change Status
                </button>
            </div>
        </div>
    );
};

export default ChangeOrderStatus;
