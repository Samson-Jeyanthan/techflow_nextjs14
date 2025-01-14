import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import { CommunityForm } from "@/components/forms";

const EditCommunity = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  return (
    <section>
      <h1 className="text-dark-100_light-850 text-3xl font-semibold">
        Edit Your Community
      </h1>
      <div className="my-8">
        <CommunityForm
          mongoUserId={JSON.stringify(mongoUser._id)}
          type="edit"
        />
      </div>
    </section>
  );
};

export default EditCommunity;
