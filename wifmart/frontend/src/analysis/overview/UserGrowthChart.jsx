import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import SummaryApi from "../../common"; // Import your API configuration

const UserGrowthChart = () => {
  const [userGrowthData, setUserGrowthData] = useState([]);

  const fetchUserGrowth = async () => {
    try {
      const response = await fetch(SummaryApi.userGrowth.url, {
        method: SummaryApi.userGrowth.method,
        credentials: "include", // Include credentials if required
      });

      const result = await response.json();

      if (result.success) {
        setUserGrowthData(result.data); // Update state with API data
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error("Error fetching user growth data:", err);
    }
  };

  useEffect(() => {
    fetchUserGrowth(); // Fetch user growth data on component mount
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">User Growth (Last Week)</h2>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserGrowthChart;
