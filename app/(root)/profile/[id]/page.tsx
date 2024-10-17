import { QuestionTab, AnswerTab } from "@/components/shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getJoinedDate } from "@/lib/utils";
import { TURLProps } from "@/types/utils.types";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const UserProfile = async ({ params, searchParams }: TURLProps) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo?.user.avatar}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="text-dark-100_light-800 text-xl font-semibold">
              {userInfo.user.name}
            </h2>
            <p className="text-light-500_dark-500 text-sm">
              @{userInfo.user.username}
            </p>
            <p className="text-light-500_dark-500 text-sm">
              {userInfo.user.location}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              <p className="text-light-500_dark-500 text-sm">
                {getJoinedDate(userInfo.user.joinedAt)}
              </p>
              {userInfo.user.bio && (
                <p className="text-light-500_dark-500 mt-8 text-sm">
                  {userInfo.user.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link
                href={`/profile/edit/${clerkId}`}
                className="text-dark-100_light-850 flex-center min-h-[46px] min-w-[175px] rounded-md bg-light-500 px-4 py-3 text-sm dark:bg-dark-350"
              >
                Edit Profile
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      Stats & Badges
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-questions" className="flex-1">
          <TabsList className="bg-light-800_dark-250 min-h-[42px] p-1 text-light-500">
            <TabsTrigger value="top-questions" className="active-tab">
              {formatAndDivideNumber(userInfo.totalQuestions)} Questions
            </TabsTrigger>
            <TabsTrigger value="answers" className="active-tab">
              {formatAndDivideNumber(userInfo.totalAnswers)} Answers
            </TabsTrigger>
            <TabsTrigger value="posts" className="active-tab">
              Posts
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-questions"
            className="mt-5 flex w-full flex-col gap-6"
          >
            <QuestionTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswerTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="posts" className="flex w-full flex-col gap-6">
            <div>PostsTab</div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default UserProfile;
