// import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QuestionForm } from "@/components/forms";
import { getUserById } from "@/lib/actions/user.action";

const AskQuestion = async () => {
  // const { userId } = auth();
  const userId = "clerk_12345abc";
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser);
  return (
    <section>
      <h1 className="text-dark-100_light-850 text-3xl font-semibold">
        Ask a Question
      </h1>
      <div className="mt-8">
        <QuestionForm mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </section>
  );
};

export default AskQuestion;
