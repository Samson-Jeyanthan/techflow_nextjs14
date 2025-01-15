import React from "react";
import { CommunityHeader, TabLinks } from "@/components/shared";
import { getCommunityByIdAction } from "@/lib/actions/community.action";

async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const communityInfo = await getCommunityByIdAction({
    communityId: params.id,
  });

  return (
    <section className="flex w-full flex-col gap-8">
      <CommunityHeader
        communityInfo={communityInfo.community}
        communityId={params.id}
      />
      <section className="flex w-full flex-col items-center gap-8">
        <TabLinks
          tabs={[
            {
              tabName: "Posts",
              value: "",
              href: `/community/${params.id}`,
              totalNumbers: 0,
            },
            {
              tabName: "Questions",
              value: "questions",
              href: `/community/${params.id}/questions`,
              totalNumbers: 0,
            },
            {
              tabName: "Shared Resources",
              value: "resources",
              href: `/community/${params.id}/resources`,
              totalNumbers: 0,
            },
            {
              tabName: "People",
              value: "people",
              href: `/community/${params.id}/people`,
              totalNumbers: 0,
            },
          ]}
        />
        {children}
      </section>
    </section>
  );
}

export default layout;
