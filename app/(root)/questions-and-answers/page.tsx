import { HomeFilters, LocalSearchbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Questions | Techflow",
};

const QandAs = () => {
  return (
    <section>
      <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
        All Questions
        <Link href="/ask-question">
          <Button className="text-light-900_dark-100 bg-primary-100_primary-500 text-sm font-medium">
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

        {/* <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        /> */}
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        fetch questions array
      </div>
      <div className="mt-10">pagination</div>
    </section>
  );
};

export default QandAs;
