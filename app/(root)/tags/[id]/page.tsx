import { QuestionCard } from "@/components/cards";
import { LocalSearchbar, NoResult, Pagination } from "@/components/shared";
import { getQuestionByTagId } from "@/lib/actions/tag.action";
import { TURLProps } from "@/types/utils.types";

const TagDetailPage = async ({ params, searchParams }: TURLProps) => {
  const results = await getQuestionByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="text-dark-100_light-900 text-3xl font-semibold">
        {results.tagTitle}
      </h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          placeholder="Search for tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {results.questions.length > 0 ? (
          results.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
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
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={results.isNext}
        />
      </div>
    </>
  );
};

export default TagDetailPage;
