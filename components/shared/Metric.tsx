import React from "react";
import { IconType } from "react-icons/lib";
import UserProfileImg from "./UserProfileImg";
import { TConvertedSvgJsxProps } from "@/types/utils.types";

interface MetricProps {
  imgUrl?: string;
  value?: string | number;
  title: string;
  textStyles?: string;
  isAuthor?: boolean;
  userName?: string;
  userId?: string;
  Icon?: IconType | React.ComponentType<TConvertedSvgJsxProps>;
  isReactIcon?: boolean;
}

const Metric = ({
  imgUrl,
  userName,
  userId,
  value,
  title,
  textStyles,
  isAuthor,
  Icon,
  isReactIcon,
}: MetricProps) => {
  // const metricContent = () => {};
  return (
    <div className="flex-center flex-wrap gap-1">
      {userId && (
        <div className="flex-center gap-1 text-xs text-light-500">
          <UserProfileImg
            src={imgUrl}
            userName={userName}
            userId={userId}
            className="size-7"
          />
          <p>{title}</p>
        </div>
      )}

      {!userId && (
        <div className={`${textStyles} flex-center gap-1 fill-primary-500`}>
          {Icon ? (
            isReactIcon ? (
              <Icon className="text-xs" />
            ) : (
              <Icon width="15px" height="15px" />
            )
          ) : null}
          <p>{value}</p>
          <p
            className={`line-clamp-1 text-xs ${isAuthor ? "max-sm:hidden" : ""}`}
          >
            {title}
          </p>
        </div>
      )}
    </div>
  );
};

export default Metric;
