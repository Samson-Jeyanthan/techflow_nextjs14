"use client";

import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";

const HomeFilters = () => {
  return (
    <div className="flex items-start gap-3">
      {HomePageFilters.map((item, index) => (
        <Button
          key={index}
          className="bg-light-800_dark-250 text-xs text-light-500"
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
