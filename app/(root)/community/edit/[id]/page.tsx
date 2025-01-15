import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import { CommunityForm } from "@/components/forms";
import { TURLProps } from "@/types/utils.types";
import { getCommunityByIdAction } from "@/lib/actions/community.action";

const EditCommunity = async ({ params }: TURLProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  const communityInfo = await getCommunityByIdAction({
    communityId: params.id,
  });

  return (
    <section>
      <h1 className="text-dark-100_light-850 text-3xl font-semibold">
        Edit Your Community
      </h1>
      <div className="my-8">
        <CommunityForm
          mongoUserId={JSON.stringify(mongoUser._id)}
          type="edit"
          communityDetails={JSON.stringify(communityInfo.community)}
        />
      </div>
    </section>
  );
};

export default EditCommunity;
