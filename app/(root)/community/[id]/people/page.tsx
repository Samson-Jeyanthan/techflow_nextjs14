import { FollowButton } from "@/components/buttons";
import { PeopleOptions } from "@/components/options";
import { UserProfileImg } from "@/components/shared";
import {
  getAllAdminsOfCommunityAction,
  getAllMembersOfCommunityAction,
  getCommunityByIdAction,
} from "@/lib/actions/community.action";
import { getUserById } from "@/lib/actions/user.action";
import { TURLProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const PeoplePage = async ({ params }: TURLProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const currentUser = await getUserById({ userId });

  const communityId = params.id;

  const results = await getAllMembersOfCommunityAction({
    communityId,
  });
  const adminResults = await getAllAdminsOfCommunityAction({
    communityId,
  });
  const communityRes = await getCommunityByIdAction({
    communityId,
  });
  const communityInfo = communityRes?.community;
  const members: any[] = results?.community?.members;
  const admins: any[] = adminResults?.admins?.admins;

  return (
    <div className="mb-20 flex w-full flex-col gap-10">
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-dark-300_light-750 w-full border-b border-light-700 py-3 text-sm dark:border-dark-400">
          Admins
        </h2>
        <div className="flex-between w-full">
          <div className="flex items-center gap-2">
            <UserProfileImg
              isShowUsername={true}
              src={communityInfo.createdBy.avatar}
              userId={communityInfo.createdBy.clerkId}
              userName={communityInfo.createdBy.username}
            />
            <p className="text-xs text-light-500">(Owner of the community)</p>
          </div>
          {communityInfo.createdBy.clerkId !== currentUser?.clerkId && (
            <FollowButton
              isSmall={true}
              hasFollowed={currentUser?.followings.some(
                (following: any) =>
                  following.userId === communityInfo.createdBy._id
              )}
              parsedFollowerId={JSON.stringify(currentUser?._id)}
              parsedFollowingId={JSON.stringify(communityInfo.createdBy._id)}
            />
          )}
        </div>
        {admins?.length > 0
          ? admins?.map((admin, index) => (
              <div key={index} className="flex-between w-full">
                <UserProfileImg
                  isShowUsername={true}
                  src={admin.avatar}
                  userId={admin.clerkId}
                  userName={admin.username}
                />
                <div className="flex-center gap-1">
                  {admin.clerkId !== currentUser?.clerkId && (
                    <FollowButton
                      isSmall={true}
                      hasFollowed={currentUser?.followings.some(
                        (following: any) =>
                          following.userId.toString() === admin?._id.toString()
                      )}
                      parsedFollowerId={JSON.stringify(currentUser?._id)}
                      parsedFollowingId={JSON.stringify(admin?._id)}
                    />
                  )}
                  {currentUser?.clerkId.toString() ===
                    communityInfo.createdBy.clerkId.toString() && (
                    <PeopleOptions
                      isMember={false}
                      communityId={communityId}
                      userId={JSON.stringify(admin?._id)}
                    />
                  )}
                </div>
              </div>
            ))
          : ""}
      </div>

      <div className="flex w-full flex-col gap-4">
        <h2 className="text-dark-300_light-750 w-full border-b border-light-700 py-3 text-sm dark:border-dark-400">
          Members
        </h2>
        {members?.length > 0 ? (
          members?.map((member, index) => (
            <div key={index} className="flex-between w-full">
              <UserProfileImg
                isShowUsername={true}
                src={member.avatar}
                userId={member.clerkId}
                userName={member.username}
              />

              <div className="flex-center gap-1">
                {member.clerkId !== currentUser?.clerkId && (
                  <FollowButton
                    isSmall={true}
                    followerId={JSON.stringify(currentUser?._id)}
                    followingId={JSON.stringify(member?._id)}
                    hasFollowed={currentUser?.followings?.some(
                      (following: any) =>
                        following?.userId?.toString() ===
                        member?._id?.toString()
                    )}
                  />
                )}

                {currentUser?.clerkId.toString() ===
                  communityInfo.createdBy.clerkId.toString() && (
                  <PeopleOptions
                    isMember={true}
                    communityId={communityId}
                    userId={JSON.stringify(member?._id)}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="flex-center min-h-60 w-full text-sm text-light-500">
            No Members
          </p>
        )}
      </div>
    </div>
  );
};

export default PeoplePage;
