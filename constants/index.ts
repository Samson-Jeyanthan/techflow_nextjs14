import React from "react";
import { IconType } from "react-icons/lib";
import { TConvertedSvgJsxProps } from "@/types/utils.types";
import { IoMdMoon } from "react-icons/io";
import { TbSunHigh } from "react-icons/tb";
import { SystemIcon } from "@/public/svgs";

interface ThemeItems {
  name: string;
  value: string;
  icon: IconType | React.ComponentType<TConvertedSvgJsxProps>;
  height: string | undefined;
}

export const THEME_OPTIONS: ThemeItems[] = [
  { name: "Light", value: "light", icon: TbSunHigh, height: undefined },
  { name: "Dark", value: "dark", icon: IoMdMoon, height: undefined },
  { name: "System", value: "system", icon: SystemIcon, height: "16px" },
];
