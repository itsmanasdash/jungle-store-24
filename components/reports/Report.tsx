import React from "react";
import { TrendingUp, BarChart3, Package, Users } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { ReportsCard } from "./ReportsCard";
import { ProductCard } from "./ProductCard";
import {
  getRevenueGrowth,
  getTotalLoyalCustomer,
  getTotalOrderRevenue,
  getTotalProductsSold,
} from "@/utils/action";
import MonthlySalesPerformance from "./Charts";

async function Report() {
  const totalRevenue = await getTotalOrderRevenue();
  const revenueGrowth = await getRevenueGrowth();
  const totalProductsSold = await getTotalProductsSold();
  const totalUsers = await getTotalLoyalCustomer();
  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Revenue Growth"
          value={revenueGrowth}
          change={{ value: "+15% from last month", type: "increase" }}
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatsCard
          title="Total Sales"
          value={totalRevenue}
          change={{ value: "+8% from last month", type: "neutral" }}
          icon={BarChart3}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        <StatsCard
          title="Products Sold"
          value={totalProductsSold}
          change={{ value: "+12% from last month", type: "increase" }}
          icon={Package}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <StatsCard
          title="New Customers"
          value={totalUsers}
          change={{ value: "+5% from last month", type: "increase" }}
          icon={Users}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ReportsCard className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
          <div className="h-64 text-gray-300">
            <MonthlySalesPerformance />
          </div>
        </ReportsCard>

        <ReportsCard>
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <div className="space-y-4">
            <ProductCard
              name="Safari T-Shirt"
              unitsSold={250}
              revenue="₹1,49,750"
            />
            <ProductCard
              name="Wildlife Keyring"
              unitsSold={180}
              revenue="₹27,000"
            />
          </div>
        </ReportsCard>
      </div>
    </div>
  );
}

export default Report;
