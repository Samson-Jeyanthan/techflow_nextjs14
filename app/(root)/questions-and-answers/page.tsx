import { QuestionCard } from "@/components/cards";
import {
  QandAFilters,
  LocalSearchbar,
  Filter,
  NoResult,
} from "@/components/shared";
import { Button } from "@/components/ui/button";
import { QANDAS_FILTERS } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { ISearchParamsProps } from "@/types/utils.types";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Questions | Techflow",
};

async function QandAs({ searchParams }: ISearchParamsProps) {
  const result = await getQuestions({
    searchQuery: searchParams.q,
  });

  return (
    <section>
      <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
        All Questions
        <Link href="/ask-question">
          <Button className="bg-primary-100_primary-500 text-sm font-medium text-light-900">
            Ask Question
          </Button>
        </Link>
      </h1>
      <div className="mb-3 mt-7 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/questions-and-answers"
          iconPosition="left"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={QANDAS_FILTERS}
          otherClasses="min-h-[48px] sm:min-w-[160px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <QandAFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question, index) => (
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
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>

      {result.questions?.length > 0 && <div className="mt-10">pagination</div>}
    </section>
  );
}

export default QandAs;
