import { QuestionCard } from "@/components/cards";
import { NoResult } from "@/components/shared";
import {
  getCommunityByIdAction,
  getCommunityQuestionsAction,
} from "@/lib/actions/community.action";
import { TURLProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";

const CommunityQuestionPage = async ({ params, searchParams }: TURLProps) => {
  const { userId: clerkId } = auth();
  const results = await getCommunityQuestionsAction({
    id: params.id,
    page: searchParams.page ? +searchParams.page : 1,
  });

  const communityInfo = await getCommunityByIdAction({
    communityId: params.id,
  });

  const userHasJoined = communityInfo.community?.members.some(
    (member: any) => member.clerkId === clerkId
  );

  return (
    <div>
      <div className="mb-10 flex w-full flex-col gap-6">
        {results.questions.length > 0 ? (
          results.questions.map((question, index) => (
            <QuestionCard
              key={index}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no questions to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            noLink={userHasJoined}
            link={`/community/upload/${params.id}/question`}
            linkTitle="Ask Question"
          />
        )}
      </div>
    </div>
  );
};

export default CommunityQuestionPage;
