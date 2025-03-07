import React from "react";
import Filter from "./filters/Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAllAnswer } from "@/lib/actions/answer.action";
import UserProfileImg from "./UserProfileImg";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Pagination from "./Pagination";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const results = await getAllAnswer({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="text-dark-100_light-850">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {results.answers.map((answer, index) => (
          <article
            key={index}
            className="border-b border-light-700 py-10 dark:border-dark-400"
          >
            <div className="flex items-center justify-between">
              <div className="mb-4 flex flex-col-reverse justify-center gap-5 sm:flex-row sm:items-center sm:gap-2">
                <UserProfileImg
                  userId={answer.author.clerkId}
                  userName={answer.author.username}
                  src={answer.author.avatar}
                  isShowUsername={true}
                />
                <p className="text-dark-400_light-500 mr-1 mt-0.5 line-clamp-1 flex gap-2 text-xs">
                  answered {getTimestamp(answer.createdAt)}
                </p>
              </div>
              <div className="flex justify-end">
                <Votes
                  type="answer"
                  itemId={JSON.stringify(answer._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={answer.upvotes.length}
                  hasUpvoted={answer.upvotes.includes(userId)}
                  downvotes={answer.downvotes.length}
                  hasDownvoted={answer.downvotes.includes(userId)}
                />
              </div>
            </div>

            <ParseHTML
              data={answer.content}
              className="text-dark-100_light-800 text-sm"
            />
          </article>
        ))}
      </div>

      <div className="mt-10 w-full">
        <Pagination
          pageNumber={page ? +page : 1}
          isNext={results.isNextAnswer}
        />
      </div>
    </div>
  );
};

export default AllAnswers;
