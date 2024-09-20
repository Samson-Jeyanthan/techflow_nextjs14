import Link from "next/link";
import { Metric, RenderTag } from "../shared";
import { formatAndDivideNumber } from "@/lib/utils";

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
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
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
}: QuestionProps) => {
  return (
    <div className="rounded-xl p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="line-clamp-1 flex text-xs text-light-500 sm:hidden">
            {/* {String(createdAt)} */}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="line-clamp-1 flex-1 text-dark-200 dark:text-light-800 sm:text-lg sm:font-semibold">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          value={formatAndDivideNumber(upvotes)}
          title="Votes"
          textStyles="text-xs text-light-500"
        />
        <Metric
          value={formatAndDivideNumber(answers.length)}
          title="Answers"
          textStyles="text-xs text-light-500"
        />
        <Metric
          value={formatAndDivideNumber(views)}
          title="Answers"
          textStyles="text-xs text-light-500"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
