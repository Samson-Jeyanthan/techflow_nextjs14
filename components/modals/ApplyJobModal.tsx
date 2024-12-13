"use client";

import { useState } from "react";
import { ApplyJobForm } from "../forms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { MdClose } from "react-icons/md";

const ApplyJobModal = ({ userDetails }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mt-4 rounded-full bg-primary-100 p-3 px-4 text-sm font-medium text-light-900">
        Apply for this job
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="bg-light-900_dark-300 flex h-auto w-full max-w-2xl flex-col gap-4 rounded-2xl p-8 shadow-md"
      >
        <DialogTitle className="m-0 p-0" />
        <ApplyJobForm userDetails={userDetails} />
        <DialogClose className="text-light-500_dark-500 flex-center bg-light-900_dark-300 absolute -right-8 -top-8 size-9 cursor-pointer rounded-full text-xl hover:text-light-900">
          <MdClose />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobModal;
