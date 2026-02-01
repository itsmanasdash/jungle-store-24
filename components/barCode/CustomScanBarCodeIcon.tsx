import * as React from "react";
import { ScanBarcode } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CustomScanBarCodeIcon = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      className="flex justify-center items-center relative bg-[#072611]/60 backdrop-blur-sm hover:bg-white/30 border-0 text-white dark:bg-slate-900/20 dark:hover:bg-white/10 dark:text-white/90"
    >
      <Link href="/scan">
        <ScanBarcode className="text-white font-bold" strokeWidth={3.5} />
      </Link>
    </Button>
  );
};

export default CustomScanBarCodeIcon;
