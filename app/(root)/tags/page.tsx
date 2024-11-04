import { TagCard } from "@/components/cards";
import { Filter, LocalSearchbar } from "@/components/shared";
import { TAGS_FILTERS } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { ISearchParamsProps } from "@/types/utils.types";
import React from "react";

const Tags = async ({ searchParams }: ISearchParamsProps) => {
  const results = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <section>
      <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
        All Tags
      </h1>
      <div className="mb-3 mt-7 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          placeholder="Search for tags"
          otherClasses="flex-1"
        />

        <Filter
          filters={TAGS_FILTERS}
          otherClasses="min-h-[48px] sm:min-w-[160px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        {results.tags.length > 0 ? (
          results.tags.map((tag, index) => <TagCard key={index} tag={tag} />)
        ) : (
          <div>
            <p>No Tags Found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tags;
