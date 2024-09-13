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

const ThemeOptions = () => {
  const mode = "dark";
  return (
    <Menubar className="relative border-none bg-transparent p-0">
      <MenubarMenu>
        <MenubarTrigger
          className={`${mode === "dark" ? "text-custom-200" : "text-light-600"} flex-center bg-dark-300 hover:bg-dark-400 hover:text-light-900 size-9 cursor-pointer rounded-full p-0 text-base`}
        >
          {mode === "dark" ? <IoMdMoon /> : <TbSunHigh />}
        </MenubarTrigger>
        <MenubarContent className="border-dark-400 bg-dark-300 shadow-dark-100/25 absolute -right-5 z-[99] min-w-32 gap-10 rounded-lg border border-solid p-2 shadow-xl">
          {THEME_OPTIONS.map((item, index) => (
            <MenubarItem
              className={`${index === 0 ? "" : "mt-1"} bg-dark-300 fill-light-600 text-light-600 hover:bg-dark-400 hover:fill-light-900 hover:text-light-900 w-32 cursor-pointer gap-3 rounded`}
              key={index}
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
