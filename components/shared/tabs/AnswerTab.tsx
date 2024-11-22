import { AnswerCard } from "@/components/cards";
import { getUserAnswers } from "@/lib/actions/user.action";
import { ISearchParamsProps } from "@/types/utils.types";
import Pagination from "../Pagination";

interface Props extends ISearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const results = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      {results.answers.map((item) => (
        <AnswerCard
          key={item._id}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
        />
      ))}

      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={results.isNextAnswer}
      />
    </>
  );
};

export default AnswerTab;
