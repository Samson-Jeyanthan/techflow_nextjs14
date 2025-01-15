import { FollowButton } from "@/components/buttons";
import { UserProfileImg } from "@/components/shared";
import {
  getAllAdminsOfCommunityAction,
  getAllMembersOfCommunityAction,
  getCommunityByIdAction,
} from "@/lib/actions/community.action";
import { TURLProps } from "@/types/utils.types";

const PeoplePage = async ({ params }: TURLProps) => {
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
  const admins: any[] = adminResults?.admins;

  return (
    <div className="flex w-full flex-col gap-10">
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
          <FollowButton isSmall={true} />
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
                <FollowButton isSmall={true} />
              </div>
            ))
          : ""}
      </div>

      <div className="flex w-full flex-col gap-4">
        <h2 className="text-dark-300_light-750 w-full border-b border-light-700 py-3 text-sm dark:border-dark-400">
          Members
        </h2>
        {members?.length > 0
          ? members?.map((member, index) => (
              <div key={index} className="flex-between w-full">
                <UserProfileImg
                  isShowUsername={true}
                  src={member.avatar}
                  userId={member.clerkId}
                  userName={member.username}
                />
                <FollowButton isSmall={true} />
              </div>
            ))
          : "No members"}
      </div>
    </div>
  );
};

export default PeoplePage;
