import { getJoinedDate } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { IoCalendarOutline } from "react-icons/io5";
import { FollowButton } from "../buttons";
import { JobsIcon } from "@/public/svgs";

type Props = {
  userInfo: any;
  currentUserId: string;
  isHiring?: boolean | undefined;
};

const UserProfileHeader = ({ userInfo, currentUserId, isHiring }: Props) => {
  const { userId: clerkId } = auth();

  return (
    <header className="flex flex-col-reverse items-start justify-between sm:flex-row">
      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <div className="relative size-full">
          <Image
            src={
              userInfo?.user.avatar || "/images/default-user-profile-pic.png"
            }
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full bg-light-700 object-cover dark:bg-dark-400"
          />
          {isHiring && (
            <span className="flex-center absolute bottom-0 right-2 z-10 size-9 rounded-full bg-white fill-black shadow dark:bg-dark-350 dark:fill-white">
              <JobsIcon width="16px" height="16px" />
            </span>
          )}
        </div>

        <div className="mt-3 w-full">
          <h2 className="text-dark-100_light-800 text-xl font-semibold">
            {userInfo?.user.name}
          </h2>
          <p className="text-dark-500_light-600 text-sm lowercase">
            @{userInfo?.user.username}
          </p>
          {userInfo?.user.location && (
            <p className="text-dark-500_light-600 text-sm">
              {userInfo?.user.location}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
            <p className="text-dark-500_light-600 flex items-center gap-2 text-sm">
              <IoCalendarOutline className="text-base" />
              {getJoinedDate(userInfo?.user.joinedAt)}
            </p>
            {userInfo?.user.bio && (
              <p className="text-dark-500_light-600 mt-8 text-sm">
                {userInfo?.user.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
        <SignedIn>
          {clerkId === userInfo?.user.clerkId ? (
            <Link
              href="/profile/edit"
              className="text-dark-100_light-850 flex-center min-h-[46px] min-w-[150px] rounded-md bg-light-700 px-4 py-3 text-sm dark:bg-dark-300"
            >
              Edit Profile
            </Link>
          ) : (
            <FollowButton
              isSmall={false}
              hasFollowed={userInfo?.user.followers.some(
                (following: any) => following.userId?.clerkId === clerkId
              )}
              followerId={JSON.stringify(currentUserId)}
              followingId={JSON.stringify(userInfo?.user._id)}
            />
          )}
        </SignedIn>
      </div>
    </header>
  );
};

export default UserProfileHeader;
