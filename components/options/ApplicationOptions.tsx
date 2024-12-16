import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MenubarItem } from "@radix-ui/react-menubar";

const ApplicationOptions = () => {
  return (
    <Menubar className="relative border-none bg-transparent p-0">
      <MenubarMenu>
        <MenubarTrigger className="hover:text-dark-100_light-900 m-0 cursor-pointer !p-0 text-xl text-light-500">
          <BsThreeDotsVertical />
        </MenubarTrigger>

        <MenubarContent className="bg-light-850_dark-200 absolute -right-5 z-[99] min-w-32 gap-10 rounded-lg border border-solid p-2 shadow-md shadow-dark-100/25 dark:border-dark-300">
          <MenubarItem className="bg-light-850_dark-200 hover:bg-light-800_dark-300 hover:text-dark-100_light-900 hover:fill-dark-100_light-900 w-32 cursor-pointer rounded fill-light-500 text-light-500">
            Edit post
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ApplicationOptions;
