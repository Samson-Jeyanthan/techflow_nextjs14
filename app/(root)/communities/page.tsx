import { CommunityCard } from "@/components/cards";
import { Filter, LocalSearchbar, NoResult } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { QANDAS_FILTERS } from "@/constants/filters";
import { getAllCommunities } from "@/lib/actions/community.action";
import { ISearchParamsProps } from "@/types/utils.types";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Communities | Techflow",
};

const CommunitiesPage = async ({ searchParams }: ISearchParamsProps) => {
  const results = await getAllCommunities({
    searchQuery: searchParams.q,
  });
  // {
  // searchQuery: searchParams.q,
  // filter: searchParams.filter,
  // page: searchParams.page ? +searchParams.page : 1,
  // }

  return (
    <section>
      <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
        All Communities
        <Link href="/create-community">
          <Button className="bg-primary-100_primary-500 text-sm font-medium text-light-900">
            Create a Community
          </Button>
        </Link>
      </h1>
      <div className="mb-3 mt-7 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/communities"
          iconPosition="left"
          placeholder="Search for communities"
          otherClasses="flex-1"
        />

        <Filter
          filters={QANDAS_FILTERS}
          otherClasses="min-h-[48px] sm:min-w-[160px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <div className="mt-10 flex w-full flex-wrap gap-4">
        {results.communities.length > 0 ? (
          results.communities.map((community, index) => (
            <CommunityCard key={index} community={community} />
          ))
        ) : (
          <NoResult
            title="There is no communties to show"
            description="Be the first to break the silence! 🚀 Create a Community and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/create-community"
            linkTitle="Create a Community"
          />
        )}
      </div>
    </section>
  );
};

export default CommunitiesPage;
