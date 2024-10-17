import Link from "next/link";

import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { LikeIcon } from "@/public/svgs";
import { EditDeleteAction } from "../shared";
import { SignedIn } from "@clerk/nextjs";

interface Props {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    avatar: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="rounded-[10px] bg-light-900 p-9 px-11 shadow-sm dark:bg-dark-250 sm:px-11"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="line-clamp-1 flex text-xs text-light-500 sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <h3 className="line-clamp-1 flex-1 text-dark-200 dark:text-light-800 sm:text-xl sm:font-semibold">
            {question.title}
          </h3>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.avatar}
          userId={author._id}
          userName={author.name}
          isAuthor
          title={`- asked ${getTimestamp(createdAt)}`}
          textStyles="text-xs text-light-500"
        />

        <div className="flex-center gap-3">
          <Metric
            Icon={LikeIcon}
            value={formatAndDivideNumber(upvotes)}
            title="Votes"
            textStyles="text-xs text-light-500"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
