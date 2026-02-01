import React, { ReactNode } from "react";

interface CardProps {
  icon?: ReactNode;
  title: string;
  value: string | number;
  valueColor?: string;
  className?: string;
}

const SalesCard: React.FC<CardProps> = ({
  icon,
  title,
  value,
  valueColor = "text-white/90",
  className = "",
}) => {
  return (
    <div
      className={`text-white/90 bg-[#072611]/60 rounded-lg p-6 bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)] ${className}`}
    >
      <div className="flex items-center gap-4">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-white/90">{title}</h3>
          <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
