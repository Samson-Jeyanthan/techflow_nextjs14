import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { UploadCommunityModal } from "../modals";

const CommunityHeader = ({ communityInfo, communityId }: any) => {
  const { userId: clerkId } = auth();

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
            <p className="text-sm lowercase text-light-500">
              Created By @{communityInfo.createdBy.username}
            </p>
            {communityInfo.members.length > 0 && (
              <p className="text-sm lowercase text-light-500">
                {communityInfo.members.length} Members
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <UploadCommunityModal communityId={communityId} />
          {clerkId === communityInfo.createdBy.clerkId ? (
            <Link href={`/community/edit/${communityInfo._id}`}>
              <Button className="bg-primary-100_primary-500 text-sm font-medium text-light-900">
                Edit Community
              </Button>
            </Link>
          ) : (
            <Link href={`/community/edit/${communityInfo._id}`}>
              <Button className="bg-primary-100_primary-500 text-sm font-medium text-light-900">
                Join Community
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default CommunityHeader;
