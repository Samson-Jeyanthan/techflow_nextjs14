import { PostCard } from "@/components/cards";
import { NoResult, Pagination } from "@/components/shared";
import {
  getUserById,
  getUserInfo,
  getUserPosts,
} from "@/lib/actions/user.action";
import { TURLProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface Props extends TURLProps {
  userId: string;
}

const UserPostsPage = async ({ searchParams, params }: Props) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });

  const userInfo = await getUserInfo({ userId: params.id });

  const results = await getUserPosts({
    userId: userInfo.user._id,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
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
            />
          ))
        ) : (
          <NoResult
            title="There is no posts to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/create-post"
            linkTitle="Create a Post"
          />
        )}
      </div>

      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={results.isNextPost}
      />
    </>
  );
};

export default UserPostsPage;
