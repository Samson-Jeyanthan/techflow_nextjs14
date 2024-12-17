import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MenubarItem } from "@radix-ui/react-menubar";
import { JOB_STATUS_OPTIONS } from "@/constants";

type Props = {
  applicationId: string;
  jobId: string;
};

const ApplicationOptions = ({ applicationId, jobId }: Props) => {
  return (
    <Menubar className="relative border-none bg-transparent p-0">
      <MenubarMenu>
        <MenubarTrigger className="hover:text-dark-100_light-900 m-0 cursor-pointer !p-0 text-xl text-light-500">
          <BsThreeDotsVertical />
        </MenubarTrigger>

        <MenubarContent className="bg-light-850_dark-200 absolute -right-5 z-[99] min-w-32 gap-10 rounded-lg border border-solid p-1 shadow-md shadow-dark-100/25 dark:border-dark-300">
          <div className="bg-light-850_dark-200 p-1 text-xs text-light-500">
            Status -
          </div>
          {JOB_STATUS_OPTIONS.map((item, index) => (
            <MenubarItem
              className="bg-light-850_dark-200 hover:bg-light-800_dark-300 hover:text-dark-100_light-900 hover:fill-dark-100_light-900 w-32 cursor-pointer rounded fill-light-500 p-1 pl-3 text-sm text-light-500"
              key={index}
            >
              {item.name}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ApplicationOptions;
