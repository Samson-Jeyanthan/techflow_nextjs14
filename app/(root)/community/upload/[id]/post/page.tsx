import { TURLProps } from "@/types/utils.types";
import { PostForm } from "@/components/forms";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCommunityByIdAction } from "@/lib/actions/community.action";

const CreatePost = async ({ params, searchParams }: TURLProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  const communityInfo = await getCommunityByIdAction({
    communityId: params.id,
  });

  return (
    <section>
      <h1 className="text-dark-100_light-850 text-3xl font-semibold">
        Create a Post to{" "}
        <span className="capitalize">{communityInfo.community.name}</span>
      </h1>
      <p className="mt-1 text-base text-light-500">
        Only displays on community&apos;s post feed
      </p>
      <div className="my-8">
        <PostForm
          currentUserId={JSON.stringify(mongoUser._id)}
          communityId={params.id}
        />
      </div>
    </section>
  );
};

export default CreatePost;
