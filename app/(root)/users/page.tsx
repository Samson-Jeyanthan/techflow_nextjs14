import { UserCard } from "@/components/cards";
import { Filter, LocalSearchbar, Pagination } from "@/components/shared";
import { USERS_FILTERS } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { ISearchParamsProps } from "@/types/utils.types";

const AllUsers = async ({ searchParams }: ISearchParamsProps) => {
  const results = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <section>
        <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
          All Users
        </h1>
        <div className="mb-3 mt-7 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar
            route="/users"
            iconPosition="left"
            placeholder="Search for users"
            otherClasses="flex-1"
          />

          <Filter
            filters={USERS_FILTERS}
            otherClasses="min-h-[48px] sm:min-w-[170px]"
          />
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          {results.users.length > 0 ? (
            results.users.map((user, index) => (
              <UserCard key={index} user={user} />
            ))
          ) : (
            <div>
              <p className="text-dark-500_light-600 h-[30rem] text-sm">
                No users found
              </p>
            </div>
          )}
        </div>
      </section>

      {results.users?.length > 0 && (
        <div className="mt-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={results.isNext}
          />
        </div>
      )}
    </>
  );
};

export default AllUsers;
