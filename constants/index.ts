import React from "react";
import { IconType } from "react-icons/lib";
import { TConvertedSvgJsxProps } from "@/types/utils.types";
import { IoMdMoon } from "react-icons/io";
import { TbSunHigh } from "react-icons/tb";
import { HomeIcon, SystemIcon, CommunityIcon } from "@/public/svgs";

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

interface ISidebarLinks {
  name: string;
  route: string;
  icon: IconType | React.ComponentType<TConvertedSvgJsxProps>;
  isLink: boolean;
}

export const SIDEBAR_LINKS: ISidebarLinks[] = [
  {
    name: "Home",
    route: "/home",
    icon: HomeIcon,
    isLink: true,
  },
  {
    name: "Q&As",
    route: "/questions-and-answers",
    icon: HomeIcon,
    isLink: true,
  },
  {
    name: "Community",
    route: "/community",
    icon: CommunityIcon,
    isLink: true,
  },
  {
    name: "Profile",
    route: "/profile",
    icon: CommunityIcon,
    isLink: true,
  },
];
