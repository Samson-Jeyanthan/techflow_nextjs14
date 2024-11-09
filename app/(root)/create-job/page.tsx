import { JobForm } from "@/components/forms";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const CreateJob = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <section>
      <h1 className="text-dark-100_light-850 text-3xl font-semibold">
        Create a Job Opportunity
      </h1>
      <div className="mt-8">
        <JobForm mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </section>
  );
};

export default CreateJob;
