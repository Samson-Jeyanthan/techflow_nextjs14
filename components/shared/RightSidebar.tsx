import Link from "next/link";
import RenderTag from "./RenderTag";

const RightSidebar = () => {
  const hotQuestions = [
    {
      id: 1,
      title:
        "What role does AI and machine learning play in software development, and how can I get started?",
    },
    {
      id: 2,
      title: "How do I use express as a custom server in NextJS?",
    },
    {
      id: 3,
      title:
        "How do I start contributing to open-source projects as a beginner?",
    },
    {
      id: 4,
      title: "How will 5G networks impact the future of IoT and smart cities?",
    },
    {
      id: 5,
      title:
        "What advancements are being made in electric vehicles (EVs) and autonomous driving technologies?",
    },
  ];

  const popularTags = [
    { id: "1", name: "Automotive Technology", totalQuestions: 26 },
    { id: "2", name: "Digital Transformation", totalQuestions: 5 },
    { id: "3", name: "Sustainability", totalQuestions: 9 },
    { id: "4", name: "Cyber Security", totalQuestions: 11 },
    { id: "5", name: "DevOps", totalQuestions: 15 },
    { id: "6", name: "Cloud Computing", totalQuestions: 20 },
  ];
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
              href={`questions/${item.id}`}
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
              _id={tag.id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount={true}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
