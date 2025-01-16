"use client";

import { formatAndDivideNumber } from "@/lib/utils";
import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiArrowUpThick,
  TiArrowDownThick,
} from "react-icons/ti";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { useEffect } from "react";
import { viewQuestion } from "@/lib/actions/interaction.action";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpvoted: boolean;
  downvotes: number;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpvoted,
  downvotes,
  hasDownvoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleVote = async (actionType: string) => {
    if (!userId) {
      return;
    }

    if (actionType === "upvote") {
      if (type === "question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      } else if (type === "answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
        // TODO: show toast message
      }
    }

    if (actionType === "downvote") {
      if (type === "question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      } else if (type === "answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
        // TODO: show toast message
      }
    }
  };

  const handleSave = async () => {};

  useEffect(() => {
    const interactAction = async () => {
      await viewQuestion({
        questionId: JSON.parse(itemId),
        userId: userId ? JSON.parse(userId) : undefined,
      });
    };

    interactAction();
  }, [itemId, userId, pathname, router]);

  return (
    <div className="flex gap-4">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-0.5 text-2xl">
          <div
            onClick={() => {
              handleVote("upvote");
            }}
            className="cursor-pointer"
          >
            {hasUpvoted ? (
              <TiArrowUpThick className="text-green-600" />
            ) : (
              <TiArrowUpOutline className="text-light-500_dark-500" />
            )}
          </div>
          <p className="text-light-500_dark-500 text-sm font-medium">
            {formatAndDivideNumber(upvotes)}
          </p>
        </div>

        <div className="flex-center gap-0.5 text-2xl">
          <div
            onClick={() => {
              handleVote("downvote");
            }}
            className="cursor-pointer"
          >
            {hasDownvoted ? (
              <TiArrowDownThick className="text-red-600" />
            ) : (
              <TiArrowDownOutline className="text-light-500_dark-500" />
            )}
          </div>
          <p className="text-light-500_dark-500 text-sm font-medium">
            {formatAndDivideNumber(downvotes)}
          </p>
        </div>

        {type === "question" && (
          <div
            className="flex-center text-light-500_dark-500 text-xl"
            onClick={handleSave}
          >
            {hasSaved ? (
              <FaBookmark className="text-custom-yellow" />
            ) : (
              <FaRegBookmark />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Votes;
