import { CommunityCard } from "@/components/cards";
import { NoResult } from "@/components/shared";
import {
  getUserById,
  getUserCreatedCommunitiesAction,
  getUserInfo,
  getUserMemberCommunitiesAction,
} from "@/lib/actions/user.action";
import { TURLProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CommunitiesPage = async ({ searchParams, params }: TURLProps) => {
  const userInfo = await getUserInfo({ userId: params.id });
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const currentUser = await getUserById({ userId });

  const createdCommunities = await getUserCreatedCommunitiesAction({
    userId: userInfo?.user._id,
    page: searchParams.page ? +searchParams.page : 1,
  });

  const joinedCommunities = await getUserMemberCommunitiesAction({
    userId: userInfo?.user._id,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        {currentUser?.clerkId === userInfo?.user.clerkId && (
          <h2 className="text-dark-300_light-750 w-full border-b border-light-700 py-3 text-sm dark:border-dark-400">
            Created Community
          </h2>
        )}
        <div className="flex w-full flex-wrap gap-4">
          {createdCommunities.communities.length > 0 ? (
            createdCommunities.communities.map((community, index) => (
              <CommunityCard key={index} community={community} />
            ))
          ) : (
            <NoResult
              title="There is no communties to show"
              description="Be the first to break the silence! 🚀 Create a community and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
              link="/create-community"
              linkTitle="Create a Community"
            />
          )}
        </div>

        {currentUser?.clerkId === userInfo?.user.clerkId && (
          <div className="mt-10 flex w-full flex-col gap-4">
            <h2 className="text-dark-300_light-750 w-full border-b border-light-700 py-3 text-sm dark:border-dark-400">
              Joined Community
            </h2>
            <div className="flex w-full flex-wrap gap-4">
              {joinedCommunities.communities.length > 0 ? (
                joinedCommunities.communities.map((community, index) => (
                  <CommunityCard key={index} community={community} />
                ))
              ) : (
                <NoResult
                  title="There is no communties to show"
                  description="Be the first to break the silence! 🚀 Create a community and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
                  noLink={true}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommunitiesPage;
