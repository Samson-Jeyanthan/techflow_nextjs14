import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  userName?: string;
  src?: string | null;
  userId?: string;
  className?: string;
}

const UserProfileImg = ({ src, userName, userId, className }: Props) => {
  return (
    <Link href={`/profile/${userId}`} className="flex items-center gap-1">
      <Image
        src={src || "/assets/images/default_profile_pic_2.png"}
        alt={userId + "profilePic"}
        width={512}
        height={512}
        className={cn(
          "text-sm text-muted-foreground size-10 bg-dark-400 object-cover",
          className
        )}
      />
      {userName && <span className="text-xs">{userName}</span>}
    </Link>
  );
};

export default UserProfileImg;
