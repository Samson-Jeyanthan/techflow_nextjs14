import React from "react";
import { TabLinks, UserProfileHeader, UserStats } from "@/components/shared";
import { getUserInfo, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const userInfo = await getUserInfo({ userId: params.id });

  const { userId } = auth();

  const currentUser = await getUserById({ userId });

  return (
    <main className="flex w-full flex-col gap-12 py-8">
      <UserProfileHeader userInfo={userInfo} currentUserId={currentUser?._id} />
      <UserStats
        userInfo={userInfo}
        badges={userInfo?.badgeCounts}
        currentUser={currentUser}
      />
      <section className="flex w-full flex-col items-center gap-8">
        <TabLinks
          tabs={[
            {
              tabName: "Posts",
              value: "",
              href: `/profile/${userInfo?.user.clerkId}`,
              totalNumbers: userInfo?.totalPosts,
            },
            {
              tabName: "Questions",
              value: "questions",
              href: `/profile/${userInfo?.user.clerkId}/questions`,
              totalNumbers: userInfo?.totalQuestions,
            },
            {
              tabName: "Answers",
              value: "answers",
              href: `/profile/${userInfo?.user.clerkId}/answers`,
              totalNumbers: userInfo?.totalAnswers,
            },
            {
              tabName: "Shared Resources",
              value: "resources",
              href: `/profile/${userInfo?.user.clerkId}/resources`,
              totalNumbers: 0,
            },
            {
              tabName: "Communities",
              value: "communities",
              href: `/profile/${userInfo?.user.clerkId}/communities`,
              totalNumbers: userInfo?.totalCreatedCommunities,
            },
          ]}
        />
        {children}
      </section>
    </main>
  );
}

export default layout;
