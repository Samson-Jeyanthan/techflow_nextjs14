import { CommunityHeader, TabLinks } from "@/components/shared";
import { getCommunityInfoAction } from "@/lib/actions/community.action";
import React from "react";

async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const communityInfo = await getCommunityInfoAction({
    communityId: params.id,
  });

  return (
    <section className="flex w-full flex-col gap-8">
      <CommunityHeader communityInfo={communityInfo} />

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
            tabName: "Members",
            value: "members",
            href: `/community/${params.id}/members`,
            totalNumbers: 0,
          },
        ]}
      />
      {children}
    </section>
  );
}

export default layout;
