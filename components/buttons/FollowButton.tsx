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
  followingId: string;
};

const FollowButton = ({
  isSmall,
  hasFollowed,
  followerId,
  followingId,
  parsedFollowerId,
}: Props) => {
  const pathname = usePathname();
  const [isFollowing, setIsFollowing] = useState(hasFollowed);
  const handleFollow = async () => {
    await followUserAction({
      followerId: parsedFollowerId || (followerId && JSON.parse(followerId)),
      followingId,
      isFollowing: hasFollowed,
      path: pathname,
    });
    setIsFollowing(!isFollowing);
  };

  return (
    <Button
      className={`${isSmall ? "h-8 rounded-full py-1" : "rounded-md"} ${isFollowing ? "border border-primary-100 bg-transparent text-primary-500" : "bg-primary-100 text-white"} w-max`}
      onClick={handleFollow}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
