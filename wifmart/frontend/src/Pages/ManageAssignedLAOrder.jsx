import React, { useEffect, useState } from 'react';
import AssignLA from '../components/AssignLA';
import SummaryApi from '../common';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await fetch(SummaryApi.getOrderLogisticsAttendants.url, {
                method: SummaryApi.getOrderLogisticsAttendants.method,
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                setOrders(data.data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
            <div className="bg-white p-4 shadow rounded">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 text-left">Order ID</th>
                            <th className="p-2 text-left">Customer</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Assign</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b">
                                <td className="p-2">{order.id}</td>
                                <td className="p-2">{order.customerName}</td>
                                <td className="p-2">{order.status}</td>
                                <td className="p-2">
                                    <AssignLA orderId={order.id} refreshData={fetchOrders} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;
