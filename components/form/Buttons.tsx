"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { SignInButton } from "@clerk/nextjs";
// import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { FaHeart, FaRegEdit, FaRegHeart } from "react-icons/fa";
import { SignInButton } from "@clerk/nextjs";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
  disabled?: boolean;
};

export const SubmitButton = ({
  className = "",
  text = "submit",
  size = "lg",
  disabled = false,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className={cn(
        "capitalize mt-10 rounded-lg bg-[#18401A] text-[#FFFAF0] transition-all hover:bg-[rgba(56,142,60,1)] hover:shadow-lg hover:shadow-green-500/50 dark:bg-[rgba(0,206,209,0.8)] dark:text-black dark:hover:bg-[rgba(57,255,20,0.9)] dark:hover:shadow-lg dark:hover:shadow-cyan-400/50",
        disabled &&
          "opacity-50 hover:bg-[#18401A] hover:shadow-none dark:hover:bg-[rgba(0,206,209,0.8)] dark:hover:shadow-none cursor-not-allowed",
        className
      )}
      size={size}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
};

type actionType = "edit" | "delete";
export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <FaRegEdit />;
      case "delete":
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className={cn(
        "p-2 cursor-pointer",
        actionType === "delete" ? "text-red-400" : "text-white/90"
      )}
    >
      {pending ? <ReloadIcon className=" animate-spin" /> : renderIcon()}
    </Button>
  );
};

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="p-2 cursor-pointer"
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({
  isFavorite,
  className,
}: {
  isFavorite: boolean;
  className?: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className={cn("p-2 cursor-pointer bg-white/80 text-black", className)}
    >
      {pending ? (
        <ReloadIcon className=" animate-spin" />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

export const ProductSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button type="button" size="default" className="mt-8">
        Please Sign In
      </Button>
    </SignInButton>
  );
};
