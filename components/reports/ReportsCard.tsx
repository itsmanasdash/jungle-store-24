import React, { ReactNode } from "react";

interface ReportsCardProps {
  children: ReactNode;
  className?: string;
}

export function ReportsCard({ children, className = "" }: ReportsCardProps) {
  return (
    <div
      className={`rounded-lg p-6 bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)] text-white/90  ${className}`}
    >
      {children}
    </div>
  );
}
