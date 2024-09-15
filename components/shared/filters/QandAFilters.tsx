"use client";

import { Button } from "@/components/ui/button";
import { QANDAS_FILTERS } from "@/constants/filters";

const QandAFilters = () => {
  return (
    <div className="flex items-start gap-3">
      {QANDAS_FILTERS.map((item, index) => (
        <Button
          key={index}
          className="bg-light-800_dark-250 hover:text-dark-100_light-800 hover:bg-light-850_dark-300 h-8 px-3 text-xs text-light-500"
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default QandAFilters;
