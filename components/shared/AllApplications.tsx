import React from "react";
import Filter from "./filters/Filter";
import { JOB_FILTERS } from "@/constants/filters";
import { ApplicationCard } from "../cards";

type Props = {
  totalApplications: number;
  jobId: string;
  applications: any[];
};

const AllApplications = async ({
  totalApplications,
  applications,
  jobId,
}: Props) => {
  return (
    <div className="mt-11 flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <h3 className="text-dark-100_light-850">
          {totalApplications} Applicaitons
        </h3>
        <Filter filters={JOB_FILTERS} />
      </div>

      <div className="grid w-full grid-cols-3 gap-4">
        {applications.map((result, index) => (
          <ApplicationCard
            key={index}
            _id={result._id}
            jobId={jobId}
            applicantId={result.applicant.clerkId}
            applicantEmail={result.applicantEmail}
            applicantName={result.applicantName}
            profilePic={result.applicant.avatar}
            resume={result.resume}
            status={result.status}
            appliedOn={result.appliedOn}
          />
        ))}
      </div>
    </div>
  );
};

export default AllApplications;
