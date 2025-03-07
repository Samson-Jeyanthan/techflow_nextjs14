import CommunityCard from "@/components/cards/CommunityCard";
import {
  Filter,
  LocalSearchbar,
  NoResult,
  Pagination,
  QandAFilters,
} from "@/components/shared";
import { Button } from "@/components/ui/button";
import { QANDAS_FILTERS } from "@/constants/filters";
import { getAllCommunities } from "@/lib/actions/community.action";
import { ISearchParamsProps } from "@/types/utils.types";
import Link from "next/link";

const CommunitiesPage = async ({ searchParams }: ISearchParamsProps) => {
  const results =
    await getAllCommunities();
    // {
    // searchQuery: searchParams.q,
    // filter: searchParams.filter,
    // page: searchParams.page ? +searchParams.page : 1,
    // }

  return (
    <>
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
        <QandAFilters />
        <div className="mt-10 flex w-full flex-col gap-6">
          {results.communities.length > 0 ? (
            results.communities.map((community, index) => (
              <CommunityCard key={index} community={community} />
            ))
          ) : (
            <NoResult
              title="There is no communties to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
              link="/create-community"
              linkTitle="Create a Community"
            />
          )}
        </div>
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={true}
        />
      </div>
    </>
  );
};

export default CommunitiesPage;
