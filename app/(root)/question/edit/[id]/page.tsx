import { QuestionForm } from "@/components/forms";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { IParamsProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const EditQuestion = async ({ params }: IParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const currentUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: params.id });

  if (result?.author.clerkId !== userId) return redirect("/");

  return (
    <section>
      <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
        Edit Question
      </h1>

      <div className="mt-9">
        <QuestionForm
          type="Edit"
          currentUserId={currentUser?._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </section>
  );
};

export default EditQuestion;
