import { ResourceCard } from "@/components/cards";
import { Filter, LocalSearchbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { QANDAS_FILTERS } from "@/constants/filters";
import { getAllResourcesAction } from "@/lib/actions/resource.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "All Resources | Techflow",
};
const Resources = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });

  const results = await getAllResourcesAction();
  //     {
  //       searchQuery: searchParams.q,
  //       filter: searchParams.filter,
  //       page: searchParams.page ? +searchParams.page : 1,
  // }

  return (
    <section>
      <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
        Resources
        <Link href="/share-resource">
          <Button className="bg-primary-100 text-sm font-medium text-light-900">
            Share Resource
          </Button>
        </Link>
      </h1>
      <div className="mb-3 mt-7 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/resources"
          iconPosition="left"
          placeholder="Search for resources"
          otherClasses="flex-1"
        />

        <Filter
          filters={QANDAS_FILTERS}
          otherClasses="min-h-[48px] sm:min-w-[160px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {results.resources.length > 0 ? (
          results.resources.map((resource, index) => (
            <ResourceCard
              key={index}
              _id={resource._id}
              title={resource.title}
              description={resource.description}
              media={resource.media}
              author={resource.author}
              createdAt={resource.createdAt}
              upvotes={resource.upvotes}
              downvotes={resource.downvotes}
              clerkId={resource.clerkId}
              currentUserId={mongoUser._id}
              tags={resource.tags}
            />
          ))
        ) : (
          <p className="text-dark-100_light-900">No resources found</p>
        )}
      </div>
    </section>
  );
};

export default Resources;
