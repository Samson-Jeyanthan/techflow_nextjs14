"use client";

import { formatAndDivideNumber } from "@/lib/utils";
import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiArrowUpThick,
} from "react-icons/ti";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

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
  const handleVote = async (voteType: string) => {};
  const handleSave = async () => {};
  return (
    <div className="flex gap-4">
      <div className="flex-center gap-2.5">
        <div
          className="flex-center gap-0.5 text-2xl"
          onClick={() => {
            handleVote("upvote");
          }}
        >
          {hasUpvoted ? (
            <TiArrowUpThick className="text-green-600" />
          ) : (
            <TiArrowUpOutline className="text-light-500_dark-500" />
          )}
          <p className="text-light-500_dark-500 text-sm font-medium">
            {formatAndDivideNumber(upvotes)}
          </p>
        </div>

        <div
          className="flex-center gap-0.5 text-2xl"
          onClick={() => {
            handleVote("downvote");
          }}
        >
          {hasDownvoted ? (
            <TiArrowDownOutline className="text-red-600" />
          ) : (
            <TiArrowDownOutline className="text-light-500_dark-500" />
          )}
          <p className="text-light-500_dark-500 text-sm font-medium">
            {formatAndDivideNumber(downvotes)}
          </p>
        </div>

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
      </div>
    </div>
  );
};

export default Votes;
