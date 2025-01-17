import Link from "next/link";

interface Props {
  tag: {
    _id: string;
    name: string;
    questions: string[];
    posts: string[];
    resources: string[];
    jobs: string[];
  };
}

const TagCard = ({ tag }: Props) => {
  return (
    <Link href={`/tags/${tag._id}`}>
      <article className="flex w-full flex-col items-center gap-2 rounded-2xl bg-light-900 p-6 dark:bg-dark-250">
        <div className="text-dark-400_light-500 bg-light-800_dark-350 w-min rounded-md border-none px-4 py-2 text-sm uppercase">
          {tag.name}
        </div>
        <p className="text-dark-300_light-750 mt-4 flex w-full items-start text-sm">
          <span className="mr-2.5 font-semibold text-primary-100">
            {tag.posts.length}+
          </span>
          Posts
        </p>
        <p className="text-dark-300_light-750 flex w-full items-start text-sm">
          <span className="mr-2.5 font-semibold text-primary-100">
            {tag.questions.length}+
          </span>
          Questions
        </p>
        <p className="text-dark-300_light-750 flex w-full items-start text-sm">
          <span className="mr-2.5 font-semibold text-primary-100">
            {tag.jobs.length}+
          </span>
          Jobs
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
