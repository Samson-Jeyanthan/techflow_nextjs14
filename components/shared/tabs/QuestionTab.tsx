import { QuestionCard } from "@/components/cards";
import { getUserQuestions } from "@/lib/actions/user.action";
import { ISearchParamsProps } from "@/types/utils.types";
import Pagination from "../Pagination";

interface Props extends ISearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const results = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {results.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
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

export default QuestionTab;
