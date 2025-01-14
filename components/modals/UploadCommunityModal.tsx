"use client";

import { COMMUNITY_UPLOAD_OPTIONS } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { LuPlus } from "react-icons/lu";
import Link from "next/link";

const UploadCommunityModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="flex-center text-dark-100_light-850 flex size-10 cursor-pointer gap-2 rounded-md bg-primary-500 fill-black p-2 text-sm dark:fill-white">
        <LuPlus className="text-lg" />
      </DialogTrigger>
      <DialogContent
        className="bg-light-900_dark-300 flex flex-col items-center rounded-2xl p-3 shadow-md"
        aria-describedby={undefined}
      >
        <DialogTitle className="text-dark-100_light-900 bg-light-900_dark-300 flex-center sticky top-0 h-16 gap-2 rounded-2xl p-4">
          Upload to Community
        </DialogTitle>

        <div className="flex w-full flex-col items-center gap-2">
          {COMMUNITY_UPLOAD_OPTIONS.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-dark-100_light-900 text-sm"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadCommunityModal;
