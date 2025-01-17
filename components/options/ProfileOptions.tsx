"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BsThreeDotsVertical } from "react-icons/bs";

const ProfileOptions = () => {
  return (
    <Menubar className="relative border-none bg-transparent p-0">
      <MenubarMenu>
        <MenubarTrigger className="hover:text-dark-100_light-900 cursor-pointer p-1 text-xl text-light-500">
          <BsThreeDotsVertical />
        </MenubarTrigger>
        <MenubarContent className="bg-light-850_dark-200 absolute -right-5 z-[99] min-w-36 gap-10 rounded-lg border border-solid p-1.5 shadow-md shadow-dark-100/25 dark:border-dark-300">
          <MenubarItem
            className="bg-light-850_dark-200 hover:bg-light-800_dark-300 hover:text-dark-100_light-900 hover:fill-dark-100_light-900 flex w-max cursor-pointer gap-3 rounded fill-custom-red text-xs text-custom-red"
            // onClick={handleDelete}
          >
            {/* <MdDelete className="text-lg" /> */}
            Delete Community
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ProfileOptions;
