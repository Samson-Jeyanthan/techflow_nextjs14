import Link from "next/link";
import { Metric, RenderTag } from "../shared";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { CommentIcon, EyeIcon, LikeIcon } from "@/public/svgs";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
  clerkId,
}: QuestionProps) => {
  return (
    <div className="rounded-2xl bg-light-900 p-9 shadow-sm dark:bg-dark-250 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <span className="line-clamp-1 flex text-xs text-light-500 sm:hidden">
          {getTimestamp(createdAt)}
        </span>
        <Link href={`/question/${_id}`}>
          <h3 className="line-clamp-1 flex-1 text-dark-200 dark:text-light-800 sm:text-xl sm:font-semibold">
            {title}
          </h3>
        </Link>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          userId={author._id}
          userName={author.name}
          isAuthor
          title={`- asked ${getTimestamp(createdAt)}`}
          textStyles="text-xs text-light-500"
        />

        <div className="flex-center gap-3">
          <Metric
            Icon={LikeIcon}
            value={formatAndDivideNumber(upvotes.length)}
            title="Votes"
            textStyles="text-xs text-light-500"
          />
          <Metric
            Icon={CommentIcon}
            value={formatAndDivideNumber(answers.length)}
            title="Answers"
            textStyles="text-xs text-light-500"
          />
          <Metric
            Icon={EyeIcon}
            value={formatAndDivideNumber(views)}
            title="Views"
            textStyles="text-xs text-light-500"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
