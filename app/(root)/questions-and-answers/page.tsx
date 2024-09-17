import { QandAFilters, LocalSearchbar, Filter } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { QANDAS_FILTERS } from "@/constants/filters";
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
        fetch questions array
      </div>
      <div className="mt-10">pagination</div>
    </section>
  );
};

export default QandAs;
