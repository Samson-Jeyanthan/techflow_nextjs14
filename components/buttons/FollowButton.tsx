"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { followUserAction } from "@/lib/actions/user.action";
import { usePathname } from "next/navigation";

type Props = {
  isSmall?: boolean;
  hasFollowed: boolean;
  followerId?: string;
  parsedFollowerId?: string;
  parsedFollowingId?: string;
  followingId?: string;
};

const FollowButton = ({
  isSmall,
  hasFollowed,
  followerId,
  followingId,
  parsedFollowerId,
  parsedFollowingId,
}: Props) => {
  const pathname = usePathname();
  const [isFollowing, setIsFollowing] = useState(hasFollowed);
  const handleFollow = async () => {
    await followUserAction({
      followerId: parsedFollowerId || (followerId && JSON.parse(followerId)),
      followingId:
        parsedFollowingId || (followingId && JSON.parse(followingId)),
      isFollowing: hasFollowed,
      path: pathname,
    });
    setIsFollowing(!isFollowing);
  };

  return (
    <Button
      className={`${isSmall ? "h-8 w-max rounded-full py-1" : "min-w-[150px] rounded-md"} ${isFollowing ? "border border-primary-100 bg-transparent text-primary-500" : "bg-primary-100 text-white"}`}
      onClick={handleFollow}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
