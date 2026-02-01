import React from "react";
import { Separator } from "../ui/separator";

interface SectionTitleProps {
  text: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ text }) => {
  return (
    <div>
      <h2 className="text-4xl font-semibold tracking-wider capitalize mb-8 text-[#051F20]/90 dark:text-[#D6E4F0]/90">
        {text}
      </h2>
      <Separator className="bg-white/30 backdrop-blur-sm h-0.5 border-0 dark:bg-slate-700/40" />
    </div>
  );
};

export default SectionTitle;
