import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ApplicationOptions } from "../options";

type Props = {
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
        <Image
          width={1024}
          height={1024}
          src={profilePic}
          alt="profile-pic"
          className="size-16 min-w-16 rounded-full bg-light-700 object-cover dark:bg-dark-400"
        />

        <div className="flex w-full items-start justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-dark-100_light-850 text-sm font-medium capitalize">
              {applicantName}
            </h2>
            <p className="text-dark-500_light-600 text-xs">
              Applied {getTimestamp(appliedOn)}
            </p>
          </div>

          <ApplicationOptions />
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
          <Button className="text-dark-400_light-500 bg-light-800_dark-350">
            View CV Resume
          </Button>
        </Link>

        <Button className="text-dark-500_light-600 w-full border border-primary-500/20">
          Contact
        </Button>
      </div>
    </article>
  );
};

export default ApplicationCard;
