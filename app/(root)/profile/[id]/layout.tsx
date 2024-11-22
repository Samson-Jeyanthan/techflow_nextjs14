import { TabLinks, UserProfileHeader } from "@/components/shared";
import { getUserInfo } from "@/lib/actions/user.action";
import React from "react";

async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const userInfo = await getUserInfo({ userId: params.id });

  return (
    <main className="flex w-full flex-col gap-12 py-8">
      <UserProfileHeader userInfo={userInfo} />
      <section className="flex w-full flex-col items-center gap-8">
        <TabLinks
          tabs={[
            {
              tabName: "Posts",
              value: "",
              href: `/profile/${userInfo.user.clerkId}`,
              totalNumbers: 0,
            },
            {
              tabName: "Questions",
              value: "questions",
              href: `/profile/${userInfo.user.clerkId}/questions`,
              totalNumbers: userInfo.totalQuestions,
            },
            {
              tabName: "Answers",
              value: "answers",
              href: `/profile/${userInfo.user.clerkId}/answers`,
              totalNumbers: userInfo.totalAnswers,
            },
            {
              tabName: "Shared Resources",
              value: "resources",
              href: `/profile/${userInfo.user.clerkId}/resources`,
              totalNumbers: 0,
            },
            {
              tabName: "Communities",
              value: "communities",
              href: `/profile/${userInfo.user.clerkId}/communities`,
              totalNumbers: 0,
            },
          ]}
        />
        {children}
      </section>
    </main>
  );
}

export default layout;
