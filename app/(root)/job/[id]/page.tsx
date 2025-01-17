import { ApplyJobModal } from "@/components/modals";
import {
  AllApplications,
  JobMetric,
  ParseHTML,
  RenderTag,
} from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  getAllApplicationsAction,
  getJobByIdAction,
} from "@/lib/actions/job.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatCountValue, getFormattedDate, getTimestamp } from "@/lib/utils";
import {
  JobsIcon,
  LocationIcon,
  SalaryIcon,
  WorkModeIcon,
} from "@/public/svgs";
import { TURLProps } from "@/types/utils.types";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { MdEdit } from "react-icons/md";

const JobDetailPage = async ({ params, searchParams }: TURLProps) => {
  const { userId: clerkId } = auth();
  const result = await getJobByIdAction({ jobId: params.id });
  const applicationResults = await getAllApplicationsAction({
    jobId: params.id,
    sortBy: searchParams?.filter,
  });
  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  const isAuthor = clerkId && clerkId === result?.author.clerkId;
  return (
    <section className="flex w-full flex-col gap-6 pb-16">
      <header className="mb-10 flex w-full flex-col items-center justify-center gap-4 border-b border-light-750 pb-12 pt-8 dark:border-dark-350 ">
        <Image
          src={result?.author?.avatar || "/images/default-user-profile-pic.png"}
          alt="profile-picture"
          width={1024}
          height={1024}
          className="size-32 rounded-full bg-light-700 object-cover dark:bg-dark-400"
        />
        <h1 className="text-dark-100_light-800 w-full text-center text-2xl font-semibold">
          {result?.title}
        </h1>
        <div className="text-dark-500_light-600 flex w-full items-center justify-center gap-2 text-base ">
          <p>{result?.author?.username}</p> -
          <p>{getTimestamp(result?.createdAt)}</p>
        </div>

        {isAuthor ? (
          <SignedIn>
            <Link href={`/job/edit/${result?._id}`}>
              <Button className="mt-4 rounded-full bg-primary-100 text-sm font-medium text-light-900">
                <MdEdit className="mr-2 text-xl" />
                Edit this job
              </Button>
            </Link>
          </SignedIn>
        ) : (
          <ApplyJobModal
            userDetails={JSON.stringify(mongoUser)}
            jobId={params.id}
            applicationInfo={JSON.stringify(applicationResults)}
          />
        )}

        <div className="text-dark-100_light-800 flex-center mt-2 gap-2 text-base">
          <p className="text-dark-500_light-600 text-sm">
            {isAuthor ? "Deadline" : "Apply Before"}
          </p>
          {getFormattedDate(result?.deadline)}
        </div>
      </header>

      <div className="bg-light-800_dark-200 mb-2 flex w-full items-center justify-between gap-6 rounded-xl p-6">
        <JobMetric
          title="Location"
          value={result?.location}
          Icon={LocationIcon}
          iconSize="27px"
        />
        <JobMetric
          title="Work Mode"
          value={result?.workMode}
          Icon={WorkModeIcon}
          iconSize="29px"
        />
        <JobMetric
          title="Employment Type"
          value={result?.employmentType}
          Icon={JobsIcon}
          iconSize="27px"
        />
        <JobMetric
          title="Salary"
          value={`
            ${result?.salaryCurrency.toUpperCase()} 
            ${formatCountValue(result?.salary)} / 
            ${result?.salaryPer}`}
          Icon={SalaryIcon}
          iconSize="27px"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-dark-100_light-800 text-xl font-semibold">
          About this job
        </h2>
        <ParseHTML
          data={result?.description}
          className="text-dark-500_light-600 text-dark-200_light-700 text-base"
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any, index: number) => (
          <RenderTag
            key={index}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      {isAuthor && (
        <AllApplications
          jobId={result?._id}
          totalApplications={result?.applications?.length}
          applications={applicationResults.applications}
        />
      )}
    </section>
  );
};

export default JobDetailPage;
