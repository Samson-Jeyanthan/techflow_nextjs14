import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  userName?: string;
  src?: string | null;
  userId?: string;
  className?: string;
  isShowUsername?: boolean;
}

const UserProfileImg = ({
  src,
  userName,
  userId,
  className,
  isShowUsername,
}: Props) => {
  return (
    <Link href={`/profile/${userId}`} className="flex items-center gap-1.5">
      <Image
        src={src || "/images/default_profile_pic.png"}
        alt={userId + "profilePic"}
        width={512}
        height={512}
        className={cn(
          "text-sm rounded-full size-10 bg-light-700 dark:bg-dark-400 object-cover",
          className
        )}
      />
      {isShowUsername
        ? userName && <span className="text-xs">{userName}</span>
        : null}
    </Link>
  );
};

export default UserProfileImg;
