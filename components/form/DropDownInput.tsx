import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const DropDownInput = ({
  name = "quantity",
  label = "Quantity",
  defaultValue = "1",
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <Select defaultValue={defaultValue} name={name}>
        <SelectTrigger className="dark:border-white/60">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent
          className="bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)]"
        >
          {[...Array(10)].map((_, index) => (
            <SelectItem
              key={index + 1}
              value={(index + 1).toString()}
              className="hover:cursor-pointer dark:hover:bg-white/60 dark:hover:text-[#030619] data-[state=checked]:bg-white/60 data-[state=checked]:text-[#030619]"
            >
              {index + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropDownInput;
