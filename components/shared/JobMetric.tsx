import { cn } from "@/lib/utils";
import { TConvertedSvgJsxProps } from "@/types/utils.types";
import React from "react";
import { IconType } from "react-icons/lib";

interface MetricProps {
  title: string;
  titleStyles?: string;
  value: string | number;
  valueStyles?: string;
  Icon: IconType | React.ComponentType<TConvertedSvgJsxProps>;
  iconSize: string;
}

const JobMetric = ({
  title,
  titleStyles,
  value,
  valueStyles,
  Icon,
  iconSize,
}: MetricProps) => {
  return (
    <article className="flex items-center gap-3">
      <div className="bg-light-850_dark-100 rounded-full fill-dark-100 p-3 dark:fill-light-900">
        <Icon width={iconSize} height={iconSize} />
      </div>
      <div className="flex flex-col items-start">
        <h4
          className={cn(
            "text-base font-medium text-dark-100_light-900 capitalize",
            valueStyles
          )}
        >
          {value}
        </h4>
        <p className={cn("text-xs text-dark-500_light-600", titleStyles)}>
          {title}
        </p>
      </div>
    </article>
  );
};

export default JobMetric;
