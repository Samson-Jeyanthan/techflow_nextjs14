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

const UploadDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <div className="flex-center text-dark-100_light-900 cursor-pointer gap-4 rounded-lg border border-primary-500/20 p-3 text-sm hover:bg-primary-500/20 hover:text-light-900">
          <LuPlus className="text-lg" />
          <p className="max-lg:hidden">Upload</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="flex-start bg-light-850_dark-200 h-[45%] gap-2 border-none">
        <DrawerHeader className="flex w-full flex-col items-center gap-2">
          <DrawerTitle className="text-center text-2xl font-semibold text-light-900">
            Choose a method to start.
          </DrawerTitle>
          <DrawerDescription className="w-1/4 text-center text-light-700">
            Showcase your talents by creating a post or share anything
            interesting from the web or social media.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex w-96 flex-col gap-6">
          <Link href="/create-post" onClick={() => handleClick()} scroll={true}>
            Create Post
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UploadDrawer;
