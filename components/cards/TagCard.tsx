import Link from "next/link";

interface Props {
  tag: {
    _id: string;
    name: string;
    questions: string[];
  };
}

const TagCard = ({ tag }: Props) => {
  return (
    <Link href={`/tags/${tag._id}`}>
      <article className="flex w-full flex-col gap-1.5 rounded-2xl bg-light-900 px-8 py-6 dark:bg-dark-250 sm:w-[250px]">
        <div className="text-dark-400_light-500 bg-light-800_dark-350 w-min rounded-md border-none px-4 py-2 text-sm uppercase">
          <p>{tag.name}</p>
        </div>
        <p className="text-dark-100_light-850 text-sm">
          <span className="mr-2.5 font-semibold text-primary-100">
            {tag.questions.length}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
