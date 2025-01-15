import { AnswerForm } from "@/components/forms";
import {
  AllAnswers,
  Metric,
  ParseHTML,
  RenderTag,
  UserProfileImg,
  Votes,
} from "@/components/shared";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { CommentIcon, EyeIcon, LikeIcon } from "@/public/svgs";
import { TURLProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";

const QuestionDetail = async ({ params, searchParams }: TURLProps) => {
  const { userId: clerkId } = auth();
  const result = await getQuestionById({ questionId: params.id });

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

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

          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser?._id)}
              upvotes={result.upvotes.length}
              hasUpvoted={result.upvotes.includes(mongoUser?._id)}
              downvotes={result.downvotes.length}
              hasDownvoted={result.downvotes.includes(mongoUser?._id)}
              hasSaved={mongoUser?.saved?.includes(result._id)}
            />
          </div>
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

      <ParseHTML
        data={result.content}
        className="text-dark-100_light-800 text-sm"
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any, index: number) => (
          <RenderTag
            key={index}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result._id}
        userId={mongoUser?._id}
        totalAnswers={result.answers.length}
        page={Number(searchParams?.page)}
        filter={searchParams?.filter}
      />

      <AnswerForm
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser?._id)}
      />
    </>
  );
};

export default QuestionDetail;
