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

const ApplyJobModal = ({ userDetails, jobId, applicationInfo }: any) => {
  const [open, setOpen] = useState(false);

  const parsedUserDetails = userDetails && JSON.parse(userDetails || "");
  const parsedApplicationInfo = applicationInfo && JSON.parse(applicationInfo);

  const hasApplied = parsedApplicationInfo?.applications?.some(
    (application: any) => application.applicant._id === parsedUserDetails._id
  );

  const handleClick = () => {
    if (!hasApplied) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClick}>
      <DialogTrigger className="mt-4 rounded-full bg-primary-100 p-3 px-4 text-sm font-medium text-light-900">
        {hasApplied ? "You have already applied" : "Apply for this job"}
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="bg-light-900_dark-300 flex h-auto w-full max-w-[46rem] flex-col gap-4 rounded-2xl p-8 shadow-md"
      >
        <DialogTitle className="m-0 p-0" />
        <ApplyJobForm
          userDetails={userDetails}
          jobId={jobId}
          setModalOpen={setOpen}
        />
        <DialogClose className="text-light-500_dark-500 flex-center bg-light-900_dark-300 hover:text-dark-100_light-900 absolute -right-8 -top-8 size-9 cursor-pointer rounded-full text-xl">
          <MdClose />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobModal;
