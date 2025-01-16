"use client";

import { Button } from "@/components/ui/button";
import { QANDAS_FILTERS } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const QandAFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("filter");
  const [isActive, setIsActive] = useState(query || "");

  const handleFilterClick = (item: string) => {
    if (isActive === item) {
      setIsActive("");
      const newURL = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newURL, { scroll: false });
    } else {
      setIsActive(item);
      const newURL = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });

      router.push(newURL, { scroll: false });
    }
  };

  return (
    <div className="hidden items-start gap-3 md:flex">
      {QANDAS_FILTERS.map((item, index) => (
        <Button
          key={index}
          className={`${isActive === item.value ? "text-dark-100_light-800 bg-primary-500/20" : "bg-light-800_dark-250 text-light-500"} hover:text-dark-100_light-800 h-8 px-3 text-xs hover:bg-primary-500/20`}
          onClickCapture={() => handleFilterClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default QandAFilters;
