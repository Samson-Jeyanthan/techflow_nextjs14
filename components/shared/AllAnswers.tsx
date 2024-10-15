import React from "react";
import Filter from "./filters/Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAllAnswer } from "@/lib/actions/answer.action";
import UserProfileImg from "./UserProfileImg";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAllAnswer({
    questionId,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="text-dark-100_light-850">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.answers.map((item, index) => (
          <article
            key={index}
            className="border-b border-light-700 py-10 dark:border-dark-400"
          >
            <div className="flex items-center justify-between">
              <div className="mb-4 flex flex-col-reverse justify-center gap-5 sm:flex-row sm:items-center sm:gap-2">
                <UserProfileImg
                  userId={item.author.clerkId}
                  userName={item.author.username}
                  src={item.author.avatar}
                  isShowUsername={true}
                />
                <p className="text-dark-400_light-500 mr-1 mt-0.5 line-clamp-1 flex gap-2 text-xs">
                  answered {getTimestamp(item.createdAt)}
                </p>
              </div>
              <div className="flex justify-end">
                <Votes />
              </div>
            </div>

            <ParseHTML data={item.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
