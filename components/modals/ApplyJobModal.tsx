"use client";

import { useState } from "react";
import { ApplyJobForm } from "../forms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { MdClose } from "react-icons/md";

const ApplyJobModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="mt-4 rounded-full bg-primary-100 text-sm font-medium text-light-900">
          Apply for this job
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="bg-light-900_dark-300 flex h-[85vh] w-full max-w-3xl rounded-2xl p-12 shadow-md"
      >
        <ApplyJobForm />
        <DialogClose className="text-light-500_dark-500 flex-center bg-light-900_dark-300 absolute -right-8 -top-8 size-9 cursor-pointer rounded-full text-xl hover:text-light-900">
          <MdClose />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobModal;
