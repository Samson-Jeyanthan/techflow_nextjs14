import { QuestionCard } from "@/components/cards";
import { Pagination } from "@/components/shared";
import { getUserInfo, getUserQuestions } from "@/lib/actions/user.action";
import { TURLProps } from "@/types/utils.types";

interface Props extends TURLProps {
  userId: string;
}

const UserQuestionsPage = async ({ searchParams, params }: Props) => {
  const userInfo = await getUserInfo({ userId: params.id });

  const results = await getUserQuestions({
    userId: userInfo.user._id,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {results.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={params.id}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}

      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={results.isNextQuestion}
      />
    </>
  );
};

export default UserQuestionsPage;
