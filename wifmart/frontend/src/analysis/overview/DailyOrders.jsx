import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import SummaryApi from "../../common";

const DailyOrders = () => {
	const [dailyOrdersData, setDailyOrdersData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDailyOrders = async () => {
			try {
				const response = await fetch(SummaryApi.allOrders.url, {
					method: SummaryApi.allOrders.method,
					credentials: "include",
				});
				const data = await response.json();

				if (data.success) {
					// Generate daily orders count
					const orders = data.data;
					const dailyCounts = {};

					orders.forEach((order) => {
						const date = new Date(order.createdAt).toLocaleDateString("en-US", {
							month: "2-digit",
							day: "2-digit",
						});
						dailyCounts[date] = (dailyCounts[date] || 0) + 1;
					});

					// Convert dailyCounts into chart data format
					const formattedData = Object.keys(dailyCounts).map((date) => ({
						date,
						orders: dailyCounts[date],
					}));

					setDailyOrdersData(formattedData);
				} else {
					setError(data.message || "Failed to fetch daily orders.");
				}
			} catch (err) {
				console.error("Error fetching daily orders:", err);
				setError("Failed to fetch daily orders.");
			} finally {
				setLoading(false);
			}
		};

		fetchDailyOrders();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className="text-xl font-semibold text-gray-100 mb-4">Daily Orders</h2>

			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={dailyOrdersData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
						<XAxis dataKey="date" stroke="#9CA3AF" />
						<YAxis stroke="#9CA3AF" />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Line type="monotone" dataKey="orders" stroke="#8B5CF6" strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default DailyOrders;
