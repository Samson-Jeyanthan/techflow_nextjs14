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
  MultiUserIcon,
  ResourceIcon,
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
    route: "/",
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
    icon: MultiUserIcon,
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
    icon: ResourceIcon,
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

export const WORKMODE_OPTIONS = [
  {
    _id: "remote",
    name: "Remote",
  },
  {
    _id: "onsite",
    name: "On-site",
  },
  {
    _id: "hybrid",
    name: "Hybrid",
  },
];

export const EMPLOYMENTTYPE_OPTIONS = [
  {
    _id: "fullTime",
    name: "Full-time",
  },
  {
    _id: "partTime",
    name: "Part-time",
  },
  {
    _id: "contract",
    name: "Contract",
  },
  {
    _id: "freelance",
    name: "Freelance",
  },
  {
    _id: "internship",
    name: "Internship",
  },
];

export const SALARY_PER_OPTIONS = [
  {
    _id: "hour",
    name: "Hour",
  },
  {
    _id: "day",
    name: "Day",
  },
  {
    _id: "month",
    name: "Month",
  },
  {
    _id: "year",
    name: "Year",
  },
];

export const SALARY_CURRENCY_OPTIONS = [
  {
    _id: "lkr",
    name: "LKR",
  },
  {
    _id: "inr",
    name: "INR",
  },
  {
    _id: "usd",
    name: "USD",
  },
  {
    _id: "eur",
    name: "EUR",
  },
  {
    _id: "gbp",
    name: "GBP",
  },
];

export const JOB_STATUS_OPTIONS = [
  {
    _id: "pending",
    name: "Pending",
  },
  {
    _id: "reviewed",
    name: "Reviewed",
  },
  {
    _id: "accepted",
    name: "Accepted",
  },
  {
    _id: "rejected",
    name: "Rejected",
  },
];
