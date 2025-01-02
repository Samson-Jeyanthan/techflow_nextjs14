import { getCommunityInfoAction } from "@/lib/actions/community.action";
import React from "react";

const CommunityPage = async ({ params }: { params: { id: string } }) => {
  const communityInfo = await getCommunityInfoAction({
    communityId: params.id,
  });

  return (
    <div className="flex w-full flex-col">{communityInfo.community.name}</div>
  );
};

export default CommunityPage;
