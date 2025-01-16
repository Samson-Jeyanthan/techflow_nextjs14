"use client";

import { Button } from "@/components/ui/button";
import { GLOBAL_SEARCH_FILTERS } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");

  const [isActive, setIsActive] = useState(typeParams || "");

  const handleTypeClick = (item: string) => {
    if (isActive === item) {
      setIsActive("");
      const newURL = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });
      router.push(newURL, { scroll: false });
    } else {
      setIsActive(item);
      const newURL = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });

      router.push(newURL, { scroll: false });
    }
  };
  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark-300_light-750 text-sm">Type: </p>
      <div className="flex gap-3">
        {GLOBAL_SEARCH_FILTERS.map((item, index) => (
          <Button
            key={index}
            type="button"
            className={`${isActive === item.value ? "text-dark-100_light-800 bg-primary-500/20" : "bg-light-800_dark-350 text-light-500"} hover:text-dark-100_light-800 h-8 rounded-2xl px-3 text-xs hover:bg-primary-500/20`}
            onClick={() => {
              handleTypeClick(item.value);
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
