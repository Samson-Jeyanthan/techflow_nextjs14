import { HomePostForm } from "@/components/forms";
import { getAllPosts } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  const results = await getAllPosts();
  // {
  // searchQuery: searchParams.q,
  // filter: searchParams.filter,
  // page: searchParams.page ? +searchParams.page : 1,
  // }

  return (
    <section className="flex w-full flex-col items-center gap-8">
      <HomePostForm
        userId={userId}
        avatar={mongoUser?.avatar}
        mongoUserId={JSON.stringify(mongoUser._id)}
      />
    </section>
  );
};

export default Home;
