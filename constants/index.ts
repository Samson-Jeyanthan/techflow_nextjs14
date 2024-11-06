import React from "react";
import { IconType } from "react-icons/lib";
import { TConvertedSvgJsxProps } from "@/types/utils.types";
import { IoMdMoon } from "react-icons/io";
import { TbSunHigh } from "react-icons/tb";
import {
  HomeIcon,
  SystemIcon,
  CommunityIcon,
  SaveIcon,
  QuestionIcon,
  TagIcon,
  JobsIcon,
} from "@/public/svgs";

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
}

export const SIDEBAR_LINKS: ISidebarLinks[] = [
  {
    name: "Home",
    route: "/home",
    icon: HomeIcon,
  },
  {
    name: "Q&As Hub",
    route: "/questions-and-answers",
    icon: QuestionIcon,
  },
  {
    name: "All Users",
    route: "/users",
    icon: CommunityIcon,
  },
  {
    name: "Tags",
    route: "/tags",
    icon: TagIcon,
  },
  {
    name: "Jobs",
    route: "/jobs",
    icon: JobsIcon,
  },
  {
    name: "Resources",
    route: "/resources",
    icon: JobsIcon,
  },
  {
    name: "Saved Collections",
    route: "/saved-collections",
    icon: SaveIcon,
  },
  {
    name: "Communities",
    route: "/communities",
    icon: CommunityIcon,
  },
];
