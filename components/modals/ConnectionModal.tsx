"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { MdClose } from "react-icons/md";
import { FollowButton } from "../buttons";
import { UserProfileImg } from "../client";

type Props = {
  userInfo: string;
  modalFor: "followers" | "followings";
};

const ConnectionModal = ({ userInfo, modalFor }: Props) => {
  const user = userInfo && JSON.parse(userInfo);

  const [activeTab, setActiveTab] = useState(modalFor);

  return (
    <Dialog>
      {modalFor === "followers" ? (
        <DialogTrigger
          className="text-dark-100_light-800 flex gap-2 text-sm"
          onClick={() => setActiveTab("followers")}
        >
          {user.followers?.length}
          <span className="text-dark-500_light-600">Followers</span>
        </DialogTrigger>
      ) : (
        <DialogTrigger
          className="text-dark-100_light-800 flex gap-2 text-sm"
          onClick={() => setActiveTab("followings")}
        >
          {user.followings?.length}
          <span className="text-dark-500_light-600">Followings</span>
        </DialogTrigger>
      )}

      <DialogContent
        aria-describedby={undefined}
        className="bg-light-900_dark-300 flex h-[75vh] w-full max-w-lg flex-col gap-4 rounded-2xl p-8 shadow-md"
      >
        <div className="flex-between sticky left-0 top-0 w-full">
          <DialogTitle
            className={`${activeTab === "followers" ? "active-connection-title" : " connection-title"}`}
            onClick={() => setActiveTab("followers")}
          >
            Followers
          </DialogTitle>
          <DialogTitle
            className={`${activeTab === "followings" ? "active-connection-title" : " connection-title"}`}
            onClick={() => setActiveTab("followings")}
          >
            Followings
          </DialogTitle>
        </div>

        <div className="flex size-full flex-col gap-2 overflow-y-auto">
          {activeTab === "followers"
            ? user.followers?.map((item: any, index: number) => (
                <div key={index} className="flex-between">
                  <UserProfileImg
                    isShowUsername={true}
                    src={item.userId?.avatar}
                    userId={item.userId?.clerkId}
                    userName={item.userId?.username}
                  />
                  <FollowButton
                    isSmall={true}
                    followingId={item.userId}
                    parsedFollowerId={user._id}
                    hasFollowed={user?.followings.some(
                      (following: any) =>
                        following.userId?._id === item.userId?._id
                    )}
                  />
                </div>
              ))
            : user.followings?.map((item: any, index: number) => (
                <div key={index} className="flex-between">
                  <UserProfileImg
                    isShowUsername={true}
                    src={item.userId?.avatar}
                    userId={item.userId?.clerkId}
                    userName={item.userId?.username}
                  />
                  <FollowButton
                    isSmall={true}
                    followingId={item.userId}
                    parsedFollowerId={user._id}
                    hasFollowed={user?.followings.some(
                      (following: any) =>
                        following.userId?._id === item.userId?._id
                    )}
                  />
                </div>
              ))}

          {activeTab === "followers"
            ? user.followers?.length === 0
            : user.followings.length === 0 && (
                <p className="flex-center h-2/3 text-light-500">
                  No Data Found
                </p>
              )}
        </div>

        <DialogClose className="text-light-500_dark-500 flex-center bg-light-900_dark-300 hover:text-dark-100_light-900 absolute -right-8 -top-8 size-9 cursor-pointer rounded-full text-xl">
          <MdClose />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectionModal;
