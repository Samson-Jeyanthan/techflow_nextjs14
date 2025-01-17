import { AnswerCard } from "@/components/cards";
import { Pagination } from "@/components/shared";
import { getUserAnswers, getUserInfo } from "@/lib/actions/user.action";
import { TURLProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";

interface Props extends TURLProps {
  userId: string;
}

const UserAnswersPage = async ({ searchParams, params }: Props) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });

  const results = await getUserAnswers({
    userId: userInfo?.user._id,
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

export default UserAnswersPage;
