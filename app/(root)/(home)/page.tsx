import PostCard from "@/components/cards/PostCard";
import { HomePostForm } from "@/components/forms";
import { NoResult } from "@/components/shared";
import { getAllPosts } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { ISearchParamsProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async ({ searchParams }: ISearchParamsProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  const results = await getAllPosts({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <section className="flex w-full flex-col items-center gap-8">
      <HomePostForm
        userId={userId}
        avatar={mongoUser?.avatar}
        mongoUserId={JSON.stringify(mongoUser._id)}
      />

      <div className="mt-10 flex w-4/6 flex-col items-center gap-6">
        {results.posts.length > 0 ? (
          results.posts.map((post, index) => (
            <PostCard
              key={index}
              _id={JSON.stringify(post._id)}
              title={post.title}
              description={post.description}
              postImage={post.postImage}
              tags={post.tags}
              author={post.author}
              likes={post.likes}
              views={post.views}
              createdAt={post.createdAt}
              currentUserId={JSON.stringify(mongoUser?._id)}
              isLiked={post.likes.includes(mongoUser?._id)}
              likesCount={post.likes.length}
            />
          ))
        ) : (
          <NoResult
            title="There is no posts to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>
    </section>
  );
};

export default Home;
