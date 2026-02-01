"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample monthly sales data
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 2000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
  { name: "Aug", sales: 3200 },
  { name: "Sep", sales: 2800 },
  { name: "Oct", sales: 3300 },
  { name: "Nov", sales: 4100 },
  { name: "Dec", sales: 5200 },
];

const MonthlySalesPerformance = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={salesData}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#22C55E" name="Sales ($)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlySalesPerformance;
