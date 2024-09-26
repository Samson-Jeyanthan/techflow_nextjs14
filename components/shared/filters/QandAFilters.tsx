"use client";

import { Button } from "@/components/ui/button";
import { QANDAS_FILTERS } from "@/constants/filters";

const QandAFilters = () => {
  const isActive = "newest";
  return (
    <div className="hidden items-start gap-3 md:flex">
      {QANDAS_FILTERS.map((item, index) => (
        <Button
          key={index}
          className={`${isActive === item.value ? "text-dark-100_light-800 bg-primary-500/20" : "bg-light-800_dark-250 text-light-500"}  hover:text-dark-100_light-800 hover:bg-light-750_dark-350 h-8 px-3 text-xs `}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default QandAFilters;
