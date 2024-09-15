"use client";

import { Input } from "@/components/ui/input";
// import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface CustomInputProps {
  route: string;
  iconPosition: "left" | "right";
  imgSrc?: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  //   const router = useRouter();
  //   const pathname = usePathname();
  //   const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  return (
    <div
      className={`bg-light-800_dark-250 flex min-h-12 grow items-center gap-2 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <CiSearch className="text-2xl text-light-500" />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="no-focus placeholder border-none bg-transparent text-light-700 shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <CiSearch className="text-2xl text-light-500" />
      )}
    </div>
  );
};

export default LocalSearchbar;
