"use client";
import { adminLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside>
      {adminLinks.map((link) => {
        const isActivePage = pathname === link.href;
        const variant = isActivePage ? "default" : "ghost";
        return (
          <Button
            key={link.label}
            asChild
            className={`w-full mb-2 capitalize font-normal justify-start ${
              isActivePage
                ? "hover:bg-amber-400/90 dark:hover:bg-[#59FEAF]/90 bg-amber-400/90 text-[#00020F] dark:bg-[#59FEAF]/90"
                : "hover:bg-white/20"
            }`}
            variant={variant}
          >
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          </Button>
        );
      })}
    </aside>
  );
};

export default Sidebar;
