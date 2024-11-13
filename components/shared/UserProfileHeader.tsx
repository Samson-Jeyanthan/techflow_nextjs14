import { getJoinedDate } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const UserProfileHeader = ({ userInfo }: { userInfo: any }) => {
  const { userId: clerkId } = auth();

  return (
    <header className="flex flex-col-reverse items-start justify-between sm:flex-row">
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
    </header>
  );
};

export default UserProfileHeader;
