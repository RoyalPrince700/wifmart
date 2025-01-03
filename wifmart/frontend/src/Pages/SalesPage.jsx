import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaShoppingCart, FaChartLine, FaArrowUp } from "react-icons/fa";
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import SalesOverviewChart from "../analysis/overview/SalesOverViewChart";
import CategoryDistributionChart from "../analysis/overview/CategoryDistributionChart";
import DailySalesTrend from "../analysis/overview/DailySalesTrend";
import SummaryApi from "../common";

const SalesPage = () => {
    const [salesStats, setSalesStats] = useState({
        totalRevenue: "₦0.00",
        averageOrderValue: "₦0.00",
        conversionRate: "0%",
        salesGrowth: "0%",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatCurrency = (value) => {
        return `₦${new Intl.NumberFormat("en-NG").format(value.toFixed(2))}`;
    };

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch(SummaryApi.allOrders.url, {
                    method: SummaryApi.allOrders.method,
                    credentials: "include",
                });
                const dataResponse = await response.json();

                if (dataResponse.success) {
                    const allOrders = dataResponse.data;

                    // Filter delivered orders
                    const deliveredOrders = allOrders.filter(order => order.status === "Delivered");

                    // Calculate Total Revenue
                    const totalRevenue = deliveredOrders.reduce((sum, order) => sum + order.totalPrice, 0);

                    // Calculate Average Order Value
                    const averageOrderValue = totalRevenue / (allOrders.length || 1);

                    // Calculate Conversion Rate
                    const conversionRate = (deliveredOrders.length / (allOrders.length || 1)) * 100;

                    // Calculate Sales Growth
                    const now = new Date();
                    const last7DaysOrders = allOrders.filter(order =>
                        new Date(order.createdAt) >= new Date(now.setDate(now.getDate() - 7))
                    );

                    const last7DaysRevenue = last7DaysOrders
                        .filter(order => order.status === "Delivered")
                        .reduce((sum, order) => sum + order.totalPrice, 0);

                    const previous7DaysOrders = allOrders.filter(order =>
                        new Date(order.createdAt) >= new Date(now.setDate(now.getDate() - 14)) &&
                        new Date(order.createdAt) < new Date(now.setDate(now.getDate() - 7))
                    );

                    const previous7DaysRevenue = previous7DaysOrders
                        .filter(order => order.status === "Delivered")
                        .reduce((sum, order) => sum + order.totalPrice, 0);

                    const salesGrowth =
                        previous7DaysRevenue > 0
                            ? ((last7DaysRevenue - previous7DaysRevenue) / previous7DaysRevenue) * 100
                            : 0;

                    // Update state
                    setSalesStats({
                        totalRevenue: formatCurrency(totalRevenue),
                        averageOrderValue: formatCurrency(averageOrderValue),
                        conversionRate: `${conversionRate.toFixed(2)}%`,
                        salesGrowth: `${salesGrowth.toFixed(2)}%`,
                    });
                } else {
                    setError(dataResponse.message || "Failed to fetch data.");
                }
            } catch (error) {
                console.error("Error fetching sales data:", error);
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchSalesData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="h-full flex flex-col">
            <Header title="Sales Dashboard" />
            <div className="flex-1 overflow-y-auto">
                <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                    {/* SALES STATS */}
                    <motion.div
                        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <StatCard
                            name="Total Revenue"
                            icon={TbCurrencyNaira}
                            value={salesStats.totalRevenue}
                            color="#6366F1"
                        />
                        <StatCard
                            name="Avg. Order Value"
                            icon={TbCurrencyNaira}
                            value={salesStats.averageOrderValue}
                            color="#10B981"
                        />
                        <StatCard
                            name="Conversion Rate"
                            icon={FaChartLine}
                            value={salesStats.conversionRate}
                            color="#F59E0B"
                        />
                        <StatCard
                            name="Sales Growth"
                            icon={FaArrowUp}
                            value={salesStats.salesGrowth}
                            color="#EF4444"
                        />
                    </motion.div>

                    <SalesOverviewChart />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                        <CategoryDistributionChart />
                        <DailySalesTrend />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SalesPage;
