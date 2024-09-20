import { QuestionCard } from "@/components/cards";
import {
  QandAFilters,
  LocalSearchbar,
  Filter,
  NoResult,
} from "@/components/shared";
import { Button } from "@/components/ui/button";
import { QANDAS_FILTERS } from "@/constants/filters";
import { Metadata } from "next";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title:
      "What are the key differences between electric vehicles and hybrid vehicles?",
    tags: [
      { _id: "101", name: "Automotive Technology" },
      { _id: "102", name: "Sustainability" },
    ],
    author: {
      _id: "201",
      name: "John Doe",
      picture: "",
      clerkId: "12345",
    },
    upvotes: 2234545,
    views: 1567545670,
    answers: [],
    createdAt: new Date("2022-01-01T00:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How can blockchain technology revolutionize the financial sector?",
    tags: [
      { _id: "103", name: "Blockchain" },
      { _id: "104", name: "FinTech" },
    ],
    author: {
      _id: "202",
      name: "Jane Smith",
      picture: "",
      clerkId: "12346",
    },
    upvotes: 50,
    views: 30503,
    answers: [],
    createdAt: new Date("2024-06-01T00:00:00.000Z"),
  },
  {
    _id: "3",
    title: "What are the advancements in AI for healthcare diagnostics?",
    tags: [
      { _id: "105", name: "Healthcare Technology" },
      { _id: "106", name: "Artificial Intelligence" },
    ],
    author: {
      _id: "203",
      name: "Alex Johnson",
      picture: "",
      clerkId: "12347",
    },
    upvotes: 43334540,
    views: 2843430,
    answers: [],
    createdAt: new Date("2024-09-19T00:00:00.000Z"),
  },
  {
    _id: "4",
    title: "What are the challenges in scaling renewable energy technologies?",
    tags: [
      { _id: "107", name: "Energy" },
      { _id: "108", name: "Environmental Technology" },
    ],
    author: {
      _id: "204",
      name: "Maria Garcia",
      picture: "",
      clerkId: "12348",
    },
    upvotes: 323342455,
    views: 20435220,
    answers: [],
    createdAt: new Date(),
  },
  {
    _id: "5",
    title: "What role does IoT play in modern manufacturing?",
    tags: [
      { _id: "109", name: "Manufacturing Technology" },
      { _id: "110", name: "IoT" },
    ],
    author: {
      _id: "205",
      name: "Michael Brown",
      picture: "",
      clerkId: "12349",
    },
    upvotes: 45,
    views: 250,
    answers: [],
    createdAt: new Date(),
  },
];

export const metadata: Metadata = {
  title: "All Questions | Techflow",
};

const QandAs = () => {
  return (
    <section>
      <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
        All Questions
        <Link href="/ask-question">
          <Button className="bg-primary-100_primary-500 text-sm font-medium text-light-900">
            Ask Question
          </Button>
        </Link>
      </h1>
      <div className="mb-3 mt-7 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={QANDAS_FILTERS}
          otherClasses="min-h-[48px] sm:min-w-[160px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <QandAFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <QuestionCard
              key={index}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no questions to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>

      {questions?.length > 0 && <div className="mt-10">pagination</div>}
    </section>
  );
};

export default QandAs;
