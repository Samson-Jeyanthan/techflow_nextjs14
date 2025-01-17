import { PostCard } from "@/components/cards";
import { NoResult } from "@/components/shared";
import { getSavedItemsAction } from "@/lib/actions/save.action";
import { getUserById } from "@/lib/actions/user.action";
import { ISearchParamsProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Saved Posts | Techflow",
};
const PostPage = async ({ searchParams }: ISearchParamsProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  const results = await getSavedItemsAction({
    userId: mongoUser?._id,
    reqFor: "Post",
    searchQuery: searchParams?.q,
  });
  return (
    <div className="mt-2 flex w-5/6 flex-col gap-6">
      {results?.savedItemIds?.length > 0 ? (
        results?.savedItemIds?.map((post, index) => (
          <PostCard
            key={index}
            _id={post?._id}
            title={post?.title}
            description={post?.description}
            media={post?.media}
            tags={post?.tags}
            author={post?.author}
            likes={post?.likes}
            views={post?.views}
            createdAt={post?.createdAt}
            currentUserId={JSON.stringify(mongoUser?._id)}
            isLiked={post?.likes.includes(mongoUser?._id)}
            likesCount={post?.likes.length}
            commentsCounts={post?.comments.length}
            hasSaved={mongoUser?.saved.some(
              (saved: any) => saved?._id.toString() === post?._id.toString()
            )}
          />
        ))
      ) : (
        <NoResult
          title="There is no post to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
          link="/create-post"
          linkTitle="Create a Post"
        />
      )}
    </div>
  );
};

export default PostPage;
