"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { LuPlus } from "react-icons/lu";
import Link from "next/link";
import { MdClose } from "react-icons/md";

interface Props {
  communityId: string;
}

const UploadCommunityModal = ({ communityId }: Props) => {
  const COMMUNITY_UPLOAD_OPTIONS = [
    {
      path: "/community/upload/" + communityId + "/post",
      name: "Create a Post",
    },
    {
      path: "/community/upload/" + communityId + "/question",
      name: "Ask a Question",
    },
    {
      path: "/community/upload/" + communityId + "/resource",
      name: "Share a Resource",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger className="flex-center flex size-10 cursor-pointer gap-2 rounded-md border border-primary-500 bg-none fill-black p-2 text-sm text-primary-500 hover:bg-primary-500 hover:text-light-900">
        <LuPlus className="text-lg" />
      </DialogTrigger>
      <DialogContent
        className="bg-light-900_dark-300 flex w-[26rem] flex-col items-center rounded-2xl p-3 shadow-md"
        aria-describedby={undefined}
      >
        <DialogTitle className="text-dark-100_light-900 flex-center sticky top-0 h-12 gap-2 rounded-2xl p-4">
          Upload Content to Community
        </DialogTitle>

        <div className="flex w-full flex-col items-center gap-2">
          {COMMUNITY_UPLOAD_OPTIONS.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-dark-100_light-900 bg-light-750_dark-250 w-full rounded-lg p-2 text-center text-sm"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <DialogClose className="text-light-500_dark-500 flex-center bg-light-900_dark-300 hover:text-dark-100_light-900 absolute -right-8 -top-8 size-9 cursor-pointer rounded-full text-xl">
          <MdClose />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default UploadCommunityModal;
