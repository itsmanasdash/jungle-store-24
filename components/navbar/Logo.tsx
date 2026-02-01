import Link from "next/link";
import { Palmtree } from "lucide-react";

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2">
        <Palmtree className="text-amber-400 dark:text-[#5FFFB5]" size={32} />
        <span className="text-2xl font-bold text-white">Jungle Treasures</span>
      </div>
    </Link>
  );
};

export default Logo;
