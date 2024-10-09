import { Metric, ParseHTML, UserProfileImg } from "@/components/shared";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { CommentIcon, EyeIcon, LikeIcon } from "@/public/svgs";

const QuestionDetail = async ({ params }: { params: { id: string } }) => {
  const result = await getQuestionById({ questionId: params.id });
  return (
    <>
      <div className="flex-start w-full flex-col gap-4">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <div className="flex items-center justify-start gap-2">
            <UserProfileImg
              src={result.author.avatar}
              userName={result.author.name}
              userId={result.author.clerkId}
            />
            <p className="text-dark-100_light-850 text-sm font-medium">
              {result.author.name}
            </p>
          </div>

          <div className="text-dark-100_light-850 flex justify-end">Voting</div>
        </div>

        <h2 className="text-dark-100_light-800 w-full text-left text-lg font-semibold">
          {result.title}
        </h2>
      </div>

      <div className="mb-8 mt-4 flex flex-wrap gap-3">
        <Metric
          Icon={LikeIcon}
          value={`asked ${getTimestamp(result.createdAt)}`}
          title=""
          textStyles="text-xs text-light-500"
        />
        <Metric
          Icon={CommentIcon}
          value={formatAndDivideNumber(result.answers.length)}
          title="Answers"
          textStyles="text-xs text-light-500"
        />
        <Metric
          Icon={EyeIcon}
          value={formatAndDivideNumber(result.views)}
          title="Views"
          textStyles="text-xs text-light-500"
        />
      </div>

      <ParseHTML data={result.content} />
    </>
  );
};

export default QuestionDetail;
