import { JobCard } from "@/components/cards";
import { Filter, LocalSearchbar, NoResult } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { QANDAS_FILTERS } from "@/constants/filters";
import { getAllJobsAction } from "@/lib/actions/job.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "All Jobs | Techflow",
};

async function JobsSection() {
  const results = await getAllJobsAction({});

  return (
    <section>
      <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
        Jobs
        <Button className="bg-primary-100_primary-500 text-sm font-medium text-light-900">
          Upload Job
        </Button>
      </h1>
      <div className="mb-3 mt-7 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/jobs"
          iconPosition="left"
          placeholder="Search for jobs"
          otherClasses="flex-1"
        />

        <Filter
          filters={QANDAS_FILTERS}
          otherClasses="min-h-[48px] sm:min-w-[160px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {results.jobs.length > 0 ? (
          results.jobs.map((job: any) => (
            <JobCard
              key={job._id}
              _id={job._id}
              title={job.title}
              author={job.author}
              description={job.description}
              salary={job.salary}
              salaryPer={job.salaryPer}
              salaryCurrency={job.salaryCurrency}
              location={job.location}
              deadline={job.deadline}
              workMode={job.workMode}
              employmentType={job.employmentType}
              createdAt={job.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no jobs to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/create-job"
            linkTitle="Create a Job Opportunity"
          />
        )}
      </div>
    </section>
  );
}

export default JobsSection;
