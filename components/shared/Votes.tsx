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
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleVote = async (actionType: string) => {
    if (!userId) {
      return toast({
        title: "You are not logged in",
        description: "You need to be logged in to vote on this question",
      });
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
      }
      return toast({
        title: `Upvote ${!hasUpvoted ? "Success" : "Removed"}`,
        variant: !hasUpvoted ? "default" : "destructive",
      });
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
      }
      // TODO: show toast message

      return toast({
        title: `Downvote ${!hasDownvoted ? "Success" : "Removed"}`,
        variant: !hasDownvoted ? "default" : "destructive",
      });
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
