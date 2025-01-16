import Link from "next/link";
import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopPopularTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getTopPopularTags();

  return (
    <aside className="bg-light-900_dark-200 sticky right-0 top-0 z-10 flex h-screen w-[300px] flex-col overflow-y-auto p-4 pt-20 text-light-900 shadow-sm dark:shadow-none max-xl:hidden 2xl:w-80 2xl:p-6 2xl:pt-24">
      <div>
        <h3 className="font-semibold text-dark-250 dark:text-light-750">
          Top Questions
        </h3>
        <div className="mt-4 flex flex-col gap-3">
          {hotQuestions.map((item) => (
            <Link
              key={item.id}
              href={`/question/${item.id}`}
              className="hover:text-dark-100_light-800 flex cursor-pointer items-center justify-between gap-5 text-[13px] text-dark-500 dark:text-light-700"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="font-semibold text-dark-250 dark:text-light-750">
          Popular tags
        </h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag, index) => (
            <RenderTag
              key={index}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.numberOfQuestions}
              showCount={true}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
