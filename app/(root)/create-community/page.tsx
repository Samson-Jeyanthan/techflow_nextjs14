import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import { CommunityForm } from "@/components/forms";

const CreateCommunity = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser);

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
