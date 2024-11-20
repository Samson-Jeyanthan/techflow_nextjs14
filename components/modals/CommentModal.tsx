"use client";

import { CommentIcon } from "@/public/svgs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const CommentModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer fill-black dark:fill-white">
        <CommentIcon width="20px" height="20px" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
