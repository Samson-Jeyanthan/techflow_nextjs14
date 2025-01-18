import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import { CommunityForm } from "@/components/forms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a Community | Techflow",
};

const CreateCommunity = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <section>
      <h1 className="text-dark-100_light-850 text-3xl font-semibold">
        Create Your Community
      </h1>
      <div className="my-8">
        <CommunityForm mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </section>
  );
};

export default CreateCommunity;
