import React from "react";
import Filter from "./filters/Filter";
import { AnswerFilters } from "@/constants/filters";

type Props = {
  totalApplications: number;
  jobId: string;
};

const AllApplications = ({ totalApplications }: Props) => {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="text-dark-100_light-850">
          {totalApplications} Applicaitons
        </h3>
        <Filter filters={AnswerFilters} />
      </div>
    </div>
  );
};

export default AllApplications;
