import React from "react";
import { Package } from "lucide-react";
import { ReportsCard } from "./ReportsCard";

interface ProductCardProps {
  name: string;
  unitsSold: number;
  revenue: string;
}

export function ProductCard({ name, unitsSold, revenue }: ProductCardProps) {
  return (
    <ReportsCard>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Package className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-gray-500">{unitsSold} units sold</p>
          </div>
        </div>
        <span className="text-lg font-semibold text-white/90">{revenue}</span>
      </div>
    </ReportsCard>
  );
}
