import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { UploadCommunityModal } from "../modals";
import { JoinButton } from "../buttons";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { CommunityOptions } from "../options";

type Props = {
  communityInfo: any;
  communityId: string;
};

const CommunityHeader = async ({ communityInfo, communityId }: Props) => {
  const { userId: clerkId } = auth();

  if (!clerkId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId: clerkId });

  const userHasJoined = communityInfo.members.some(
    (member: any) => member.clerkId === clerkId
  );

  const adminUser = communityInfo.admins.some(
    (admin: any) => admin.clerkId === clerkId
  );

  return (
    <header className="flex w-full flex-col items-start gap-6">
      <Image
        src={communityInfo.coverPhoto || "/images/default-community-cover.jpg"}
        alt=""
        width={1024}
        height={1024}
        className="h-72 w-full rounded-2xl bg-light-700 object-cover dark:bg-dark-400"
      />
      <div className="flex w-full justify-between gap-4">
        <div className="flex items-start gap-4">
          <Image
            width={512}
            height={512}
            src={communityInfo.profilePhoto}
            alt={communityInfo.name}
            className="size-24 min-w-24 rounded-full bg-light-700 object-cover dark:bg-dark-400"
          />
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-dark-100_light-900 text-2xl font-semibold">
              {communityInfo.name}
            </h1>
            <div className="text-sm lowercase text-light-500">
              Created By
              <Link
                href={`/profile/${communityInfo.createdBy.clerkId}`}
                className="text-sm lowercase text-light-500"
              >
                @{communityInfo.createdBy.username}
              </Link>
            </div>
            {communityInfo.members.length > 0 && (
              <p className="text-sm lowercase text-light-500">
                {communityInfo.members.length} Members
              </p>
            )}
            {communityInfo.bio && (
              <p className="text-dark-300_light-750 mt-2 text-sm lowercase first-letter:capitalize">
                {communityInfo.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {clerkId === communityInfo.createdBy.clerkId ||
          userHasJoined ||
          adminUser ? (
            <UploadCommunityModal communityId={communityId} />
          ) : null}
          {clerkId === communityInfo.createdBy.clerkId || adminUser ? (
            <Link href={`/community/edit/${communityInfo._id}`}>
              <Button className="bg-primary-100_primary-500 text-sm font-medium text-light-900">
                Edit Community
              </Button>
            </Link>
          ) : (
            <JoinButton
              communityId={communityId}
              currentUserId={JSON.stringify(mongoUser?._id)}
              hasJoined={userHasJoined}
            />
          )}
          {clerkId === communityInfo.createdBy.clerkId && (
            <CommunityOptions communityId={communityId} />
          )}
        </div>
      </div>
    </header>
  );
};

export default CommunityHeader;
