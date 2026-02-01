import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RatingInput = ({
  name,
  labelText,
}: {
  name: string;
  labelText?: string;
}) => {
  const numbers = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    return value.toString();
  }).reverse();

  return (
    <div className="mb-2 max-w-xs">
      <Label htmlFor={name} className="capitalize text-white/90">
        {labelText || name}
      </Label>
      <Select defaultValue={numbers[0]} name={name} required>
        <SelectTrigger className="dark:border-white/60">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          className="bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)]"
        >
          {numbers.map((number) => {
            return (
              <SelectItem
                key={number}
                value={number}
                className="hover:cursor-pointer dark:hover:bg-white/60 dark:hover:text-[#030619] data-[state=checked]:bg-white/60 data-[state=checked]:text-[#030619] text-white"
              >
                {number}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RatingInput;
