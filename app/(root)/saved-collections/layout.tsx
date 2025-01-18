import React from "react";
import { Filter, LocalSearchbar, TabLinks } from "@/components/shared";
import { QANDAS_FILTERS } from "@/constants/filters";

async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <main className="mt-4 flex w-full flex-col">
      <h1 className="h1-bold text-dark-100_light-900">Saved Collections</h1>
      <div className="mb-3 mt-7 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/saved-collections"
          iconPosition="left"
          placeholder="Search for collections"
          otherClasses="flex-1"
        />

        <Filter
          filters={QANDAS_FILTERS}
          otherClasses="min-h-[48px] sm:min-w-[160px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <section className="mt-4 flex w-full flex-col items-center gap-8">
        <div className="flex w-full justify-start">
          <TabLinks
            tabs={[
              {
                tabName: "Posts",
                value: "",
                href: "/saved-collections",
                totalNumbers: 0,
              },
              {
                tabName: "Questions",
                value: "questions",
                href: "/saved-collections/questions",
                totalNumbers: 0,
              },
            ]}
          />
        </div>
        {children}
      </section>
    </main>
  );
}

export default layout;
