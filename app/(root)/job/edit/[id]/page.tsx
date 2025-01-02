import { JobForm } from "@/components/forms";
import { getJobByIdAction } from "@/lib/actions/job.action";
import { getUserById } from "@/lib/actions/user.action";
import { IParamsProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";

const JobEdit = async ({ params }: IParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const result = await getJobByIdAction({ jobId: params.id });

  return (
    <section>
      <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
        Edit Job Opportunity
      </h1>

      <div className="mt-9">
        <JobForm
          type="edit"
          currentUserId={mongoUser._id}
          jobDetails={JSON.stringify(result)}
        />
      </div>
    </section>
  );
};

export default JobEdit;
