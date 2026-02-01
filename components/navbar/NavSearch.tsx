"use client";
import React from "react";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

const NavSearch = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/products?${params.toString()}`);
  }, 300);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams, search]);
  return (
    <Input
      type="search"
      className="max-w-xs rounded-md border-none bg-[#072611]/60 backdrop-blur-sm dark:bg-slate-800/90 placeholder:text-white/90 dark:placeholder:text-blue-200/90 placeholder:font-medium focus:ring-2 focus:ring-green-400/50 dark:focus:ring-blue-400/50 transition-all duration-200"
      placeholder="        Search for products"
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
};

export default NavSearch;
