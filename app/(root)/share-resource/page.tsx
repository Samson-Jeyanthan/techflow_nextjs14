import { ResourceForm } from "@/components/forms";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ShareResource = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  return (
    <section>
      <h1 className="text-dark-100_light-850 text-3xl font-semibold">
        Share a Resource
      </h1>
      <div className="mt-8">
        <ResourceForm currentUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </section>
  );
};

export default ShareResource;
