import { JobMetric, ParseHTML, RenderTag } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { getJobByIdAction } from "@/lib/actions/job.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatCountValue, getTimestamp } from "@/lib/utils";
import {
  JobsIcon,
  LocationIcon,
  SalaryIcon,
  WorkModeIcon,
} from "@/public/svgs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const JobDetailPage = async ({ params }: { params: { id: string } }) => {
  const { userId: clerkId } = auth();
  const result = await getJobByIdAction({ jobId: params.id });

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  console.log(mongoUser);
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

        <Button className="mt-4 rounded-full bg-primary-100 text-sm font-medium text-light-900">
          Apply for this job
        </Button>
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
    </section>
  );
};

export default JobDetailPage;
