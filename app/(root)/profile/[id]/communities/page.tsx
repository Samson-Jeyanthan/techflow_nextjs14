import { CommunityCard } from "@/components/cards";
import { NoResult } from "@/components/shared";
import {
  getUserCreatedCommunitiesAction,
  getUserInfo,
} from "@/lib/actions/user.action";
import { TURLProps } from "@/types/utils.types";

const CommunitiesPage = async ({ searchParams, params }: TURLProps) => {
  const userInfo = await getUserInfo({ userId: params.id });

  const results = await getUserCreatedCommunitiesAction({
    userId: userInfo.user._id,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="flex w-full flex-wrap gap-4">
      {results.communities.length > 0 ? (
        results.communities.map((community, index) => (
          <CommunityCard key={index} community={community} />
        ))
      ) : (
        <NoResult
          title="There is no communties to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
          link="/create-community"
          linkTitle="Create a Community"
        />
      )}
    </div>
  );
};

export default CommunitiesPage;
