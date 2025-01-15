"use client";

import { joinCommunityAction } from "@/lib/actions/community.action";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

type Props = {
  communityId: string;
  currentUserId: string;
  hasJoined: boolean;
};

const JoinButton = ({ communityId, currentUserId, hasJoined }: Props) => {
  const pathname = usePathname();

  const handleJoinCommunity = async () => {
    console.log(communityId, JSON.parse(currentUserId), hasJoined);
    await joinCommunityAction({
      communityId,
      hasJoined,
      userId: JSON.parse(currentUserId),
      path: pathname,
    });
  };
  return (
    <Button
      className="bg-primary-100_primary-500 text-sm font-medium text-light-900"
      onClick={handleJoinCommunity}
    >
      {hasJoined ? "Joined" : "Join Community"}
    </Button>
  );
};

export default JoinButton;
