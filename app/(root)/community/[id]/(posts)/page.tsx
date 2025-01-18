import { PostCard } from "@/components/cards";
import { NoResult } from "@/components/shared";
import { getCommunityPostsAction } from "@/lib/actions/community.action";
import { getUserById } from "@/lib/actions/user.action";
import { TURLProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";

const CommunityPage = async ({ params, searchParams }: TURLProps) => {
  const { userId: clerkId } = auth();

  let mongoUser: any;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  const results = await getCommunityPostsAction({
    id: params.id,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="flex w-5/6 flex-col gap-10">
      {results.posts.length > 0 ? (
        results.posts.map((post, index) => (
          <PostCard
            key={index}
            _id={post._id}
            title={post.title}
            description={post.description}
            media={post.media}
            tags={post.tags}
            author={post.author}
            likes={post.likes}
            views={post.views}
            createdAt={post.createdAt}
            currentUserId={JSON.stringify(mongoUser?._id)}
            isLiked={post.likes.includes(mongoUser?._id)}
            likesCount={post.likes.length}
            commentsCounts={post.comments.length}
            hasSaved={mongoUser?.saved.some(
              (saved: any) => saved?._id.toString() === post?._id.toString()
            )}
          />
        ))
      ) : (
        <NoResult
          title="There is no posts to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
          noLink={true}
        />
      )}
    </div>
  );
};

export default CommunityPage;
