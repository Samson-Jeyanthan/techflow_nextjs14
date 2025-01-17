import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ApplicationOptions } from "../options";

type Props = {
  _id: string;
  jobId: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  profilePic: string;
  appliedOn: Date;
  status: string;
  resume: {
    name: string;
    url: string;
  };
};

const ApplicationCard = ({
  _id,
  jobId,
  applicantId,
  applicantName,
  applicantEmail,
  profilePic,
  appliedOn,
  status,
  resume,
}: Props) => {
  return (
    <article className="bg-light-800_dark-200 flex w-full flex-col items-start gap-2 rounded-2xl p-6">
      <div className="flex w-full items-start justify-center gap-4">
        <Link href={`/profile/${applicantId}`} className="rounded-full">
          <Image
            width={1024}
            height={1024}
            src={profilePic}
            alt="profile-pic"
            className="size-16 min-w-16 rounded-full bg-light-700 object-cover dark:bg-dark-400"
          />
        </Link>

        <div className="flex w-full items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <Link
              href={`/profile/${applicantId}`}
              className="text-dark-100_light-850 text-sm font-medium capitalize"
            >
              {applicantName}
            </Link>
            <p className="text-dark-500_light-600 text-xs">
              Applied {getTimestamp(appliedOn)}
            </p>
          </div>

          <ApplicationOptions
            applicationId={JSON.stringify(_id)}
            jobId={JSON.stringify(jobId)}
          />
        </div>
      </div>

      <div className="text-dark-400_light-500 mt-4 flex items-center gap-2 text-sm">
        <p>Status:</p>
        <span className="text-dark-100_light-850 text-sm font-semibold">
          {status}
        </span>
      </div>

      <div className="mt-3 flex w-full gap-2">
        <Link href={resume.url} target="_blank">
          <Button className="text-dark-400_light-500 bg-light-750 dark:bg-dark-350">
            View CV Resume
          </Button>
        </Link>

        <Link href={`mailto:${applicantEmail}`}>
          <Button className="text-dark-500_light-600 w-full border border-primary-500/20">
            Contact
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default ApplicationCard;
