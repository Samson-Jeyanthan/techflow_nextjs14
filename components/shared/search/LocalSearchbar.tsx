"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newURL = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newURL, { scroll: false });
      } else {
        console.log(route, pathname);
        if (pathname === route) {
          const newURL = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });

          router.push(newURL, { scroll: false });
        }
      }
    }, 350);

    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);

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
        className="no-focus placeholder text-dark-100_light-850 border-none bg-transparent shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <CiSearch className="text-2xl text-light-500" />
      )}
    </div>
  );
};

export default LocalSearchbar;
