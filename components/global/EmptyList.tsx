import { cn } from "@/lib/utils";
import React from "react";

interface EmptyListProps {
  heading?: string | "No items found.";
  className?: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ heading, className }) => {
  return <h2 className={cn("text-xl", className)}>{heading}</h2>;
};

export default EmptyList;
