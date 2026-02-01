import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import { links } from "@/utils/links";
import UserIcon from "./UserIcon";
import SignOutLink from "./SignOutLink";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const LinksDropdown = () => {
  const { userId } = auth();
  const isAdmin = userId === process.env.ADMIN_USER_ID;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-4 items-center relative bg-[#072611]/60 backdrop-blur-sm hover:bg-white/30 border-0 text-white dark:bg-slate-900/20 dark:hover:bg-white/10"
        >
          <LuAlignLeft className="w-6 h-6" strokeWidth={3.5} />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48 bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)] "
        align="start"
        sideOffset={10}
      >
        <SignedOut>
          <DropdownMenuItem className="hover:bg-white/60 text-white hover:text-black dark:hover:bg-white/60 dark:hover:text-[#030619]">
            <SignInButton mode="modal">
              <button className="w-full text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-300/50" />
          <DropdownMenuItem className="hover:bg-white/60 text-white hover:text-black dark:hover:bg-white/60 dark:hover:text-[#030619]">
            <SignUpButton mode="modal">
              <button className="w-full text-left">Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {links.map((link) => {
            if (link.label === "dashboard" && !isAdmin) return null;
            return (
              <DropdownMenuItem
                key={link.href}
                className="hover:bg-white/60 text-white hover:text-black dark:hover:bg-white/60 dark:hover:text-[#030619]"
              >
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator className="bg-gray-300/50" />
          <DropdownMenuItem className="hover:bg-white/60 text-white hover:text-black dark:hover:bg-white/60 dark:hover:text-[#030619]">
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default LinksDropdown;
