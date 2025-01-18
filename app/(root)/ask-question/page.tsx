import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QuestionForm } from "@/components/forms";
import { getUserById } from "@/lib/actions/user.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask a Question | Techflow",
};

const AskQuestion = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <section>
      <h1 className="text-dark-100_light-850 text-3xl font-semibold">
        Ask a Question
      </h1>
      <div className="my-8">
        <QuestionForm currentUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </section>
  );
};

export default AskQuestion;
