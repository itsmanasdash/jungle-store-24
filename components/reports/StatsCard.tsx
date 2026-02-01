import React from "react";
import { ReportsCard } from "./ReportsCard";
import { DivideIcon as LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  icon: typeof LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  iconBgColor,
}: StatsCardProps) {
  const changeColorClass = {
    increase: "text-green-600",
    decrease: "text-red-600",
    neutral: "text-blue-600",
  }[change.type];

  return (
    <ReportsCard>
      <div className="flex justify-between items-start mb-4">
        <span className="text-white/90 font-medium">{title}</span>
        <div className={`p-2 rounded-full ${iconBgColor}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold">{value}</div>
        <div className={changeColorClass}>{change.value}</div>
      </div>
    </ReportsCard>
  );
}
