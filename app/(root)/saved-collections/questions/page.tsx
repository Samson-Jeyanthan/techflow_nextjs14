import { QuestionCard } from "@/components/cards";
import { NoResult } from "@/components/shared";
import { getSavedItemsAction } from "@/lib/actions/save.action";
import { getUserById } from "@/lib/actions/user.action";
import { ISearchParamsProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Saved Questions | Techflow",
};

const QuestionPage = async ({ searchParams }: ISearchParamsProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  const results = await getSavedItemsAction({
    userId: mongoUser?._id,
    reqFor: "Question",
    searchQuery: searchParams?.q,
  });

  return (
    <div className="mt-2 flex w-full flex-col gap-6">
      {results.savedItemIds.length > 0 ? (
        results.savedItemIds.map((question, index) => (
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
  );
};

export default QuestionPage;
