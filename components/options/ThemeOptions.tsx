"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { TbSunHigh } from "react-icons/tb";
import { IoMdMoon } from "react-icons/io";
import { THEME_OPTIONS } from "@/constants";
import { useTheme } from "@/context/ThemeProvider";

const ThemeOptions = () => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className="relative border-none bg-transparent p-0">
      <MenubarMenu>
        <MenubarTrigger
          className={`${mode === "dark" ? "text-custom-200" : "text-light-500_dark-500"} flex-center hover:bg-light-800_dark-300 bg-light-900_dark-200 hover:text-dark-100_light-900 size-9 cursor-pointer rounded-full p-0 text-base`}
        >
          {mode === "dark" ? <IoMdMoon /> : <TbSunHigh />}
        </MenubarTrigger>
        <MenubarContent className="bg-light-850_dark-200 absolute -right-5 z-[99] min-w-32 gap-10 rounded-lg border border-solid p-2 shadow-md shadow-dark-100/25 dark:border-dark-300">
          {THEME_OPTIONS.map((item, index) => (
            <MenubarItem
              className={`${index === 0 ? "" : "mt-1"} bg-light-850_dark-200 hover:bg-light-800_dark-300 hover:text-dark-100_light-900 hover:fill-dark-100_light-900 w-32 cursor-pointer gap-3 rounded fill-light-500 text-light-500`}
              key={index}
              onClick={() => {
                setMode(item.value);
                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              {item.height ? (
                <item.icon height={item.height} width={item.height} />
              ) : (
                <item.icon className="text-base" />
              )}
              <p className="text-xs">{item.name}</p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ThemeOptions;
