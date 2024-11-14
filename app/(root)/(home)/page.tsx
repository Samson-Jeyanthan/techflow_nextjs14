import { HomePostForm } from "@/components/forms";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

const Home = async () => {
  const { userId } = auth();

  const mongoUser = await getUserById({ userId });

  return (
    <section className="flex w-full flex-col items-center gap-8">
      <HomePostForm userId={userId} avatar={mongoUser?.avatar} />
    </section>
  );
};

export default Home;
