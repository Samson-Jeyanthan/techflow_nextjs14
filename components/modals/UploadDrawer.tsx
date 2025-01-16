"use client";

import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { UPLOAD_DRAWER_OPTIONS } from "@/constants";

const UploadDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <div className="flex-center text-dark-500_light-600 hover:text-dark-100_light-900 cursor-pointer gap-4 rounded-lg border border-primary-500/20 p-3 text-sm hover:bg-primary-500/20">
          <LuPlus className="text-lg" />
          <p className="max-lg:hidden">Upload</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="flex-start bg-light-850_dark-200 h-[48%] gap-2 border-none !pt-2">
        <DrawerHeader className="flex w-full flex-col items-center gap-2">
          <DrawerTitle className="text-dark-100_light-900 text-center text-2xl font-semibold">
            Choose a method to start.
          </DrawerTitle>
          <DrawerDescription className="w-1/4 text-center text-dark-400 dark:text-light-700">
            Showcase your talents by creating a post or share anything
            interesting from the web or social media.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-center mt-4 w-96 flex-col gap-4">
          {UPLOAD_DRAWER_OPTIONS.map((item, index) => (
            <Link
              href={item.path}
              onClick={() => handleClick()}
              scroll={true}
              key={index}
              className="flex-center text-dark-100_light-900 w-full max-w-[300px] cursor-pointer gap-4 rounded-lg border border-primary-100/20 p-3 text-sm hover:bg-primary-100 hover:text-light-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UploadDrawer;
