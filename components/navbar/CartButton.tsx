import { Button } from "../ui/button";
import Link from "next/link";
import { LucideShoppingCart } from "lucide-react";
import { fetchCartItems } from "@/utils/action";

const CartButton = async () => {
  const numItemsInCart = await fetchCartItems();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex justify-center items-center relative bg-[#072611]/60 backdrop-blur-sm hover:bg-white/30 border-0 text-white dark:bg-slate-900/20 dark:hover:bg-white/10"
      asChild
    >
      <Link href="/cart">
        <LucideShoppingCart
          className="text-white font-bold"
          strokeWidth={3.5}
        />
        <span className="absolute -top-2 -right-2 bg-amber-400 dark:bg-[#5FFFB5] dark:text-[#030619] text-[#030619] rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
};

export default CartButton;
