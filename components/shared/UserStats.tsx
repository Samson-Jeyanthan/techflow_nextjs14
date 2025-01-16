import React from "react";
import { ConnectionModal } from "../modals";
import { BadgeCards } from "../cards";
import { IBadgeCounts } from "@/types/utils.types";

interface Props {
  userInfo: any;
  currentUser?: string;
  badges: IBadgeCounts;
}

const UserStats = ({ userInfo, currentUser, badges }: Props) => {
  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-5 md:grid-cols-4">
      <div className="flex-center h-28 gap-4 rounded-xl bg-light-900 p-5 dark:bg-dark-250">
        <ConnectionModal
          modalFor="followers"
          userInfo={JSON.stringify(userInfo.user)}
          currentUserInfo={JSON.stringify(currentUser)}
        />
        <ConnectionModal
          modalFor="followings"
          userInfo={JSON.stringify(userInfo.user)}
          currentUserInfo={JSON.stringify(currentUser)}
        />
      </div>
      <BadgeCards
        imgUrl="/images/trophy-star-gold.png"
        value={badges.GOLD}
        title="Gold Badges"
      />
      <BadgeCards
        imgUrl="/images/trophy-star-silver.png"
        value={badges.SILVER}
        title="Silver Badges"
      />
      <BadgeCards
        imgUrl="/images/trophy-star-bronze.png"
        value={badges.BRONZE}
        title="Bronze Badges"
      />
    </div>
  );
};

export default UserStats;
