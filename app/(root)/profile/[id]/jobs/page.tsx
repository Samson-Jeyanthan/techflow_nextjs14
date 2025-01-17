import { JobCard } from "@/components/cards";
import { NoResult } from "@/components/shared";
import { getUserInfo, getUserJobsAction } from "@/lib/actions/user.action";
import { TURLProps } from "@/types/utils.types";

interface Props extends TURLProps {
  userId: string;
}
const JobsPage = async ({ searchParams, params }: Props) => {
  const userInfo = await getUserInfo({ userId: params.id });

  const results = await getUserJobsAction({
    userId: userInfo?.user._id,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col gap-6">
        {results.jobs.length > 0 ? (
          results?.jobs.map((job: any) => (
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
            noLink={true}
          />
        )}
      </div>
    </>
  );
};

export default JobsPage;
