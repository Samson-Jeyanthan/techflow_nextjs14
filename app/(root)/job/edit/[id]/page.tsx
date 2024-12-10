import { QuestionForm } from "@/components/forms";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { IParamsProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";

const JobEdit = async ({ params }: IParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: params.id });

  return (
    <section>
      <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
        Edit Question
      </h1>

      <div className="mt-9">
        <QuestionForm
          type="Edit"
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </section>
  );
};

export default JobEdit;
