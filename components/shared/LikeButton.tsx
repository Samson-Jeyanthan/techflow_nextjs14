"use client";

import { likePost } from "@/lib/actions/post.action";
import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

type Props = {
  userId: string;
  postId: string;
  likeCounts: number;
  isUserLiked: boolean;
};

const LikeButton = ({ userId, postId, likeCounts, isUserLiked }: Props) => {
  console.log(userId, postId);
  const [isLiked, setIsLiked] = useState(isUserLiked || false);
  const [likeCount, setLikeCount] = useState(likeCounts);

  const handleLike = async () => {
    if (!userId) {
      return;
    }

    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    const { status } = await likePost({
      userId,
      postId,
      isLiked: !isLiked,
      path: "",
    });

    console.log(status);
  };

  return (
    <div className="text-dark-100_light-850 flex items-start gap-2">
      <p onClick={handleLike} className="cursor-pointer">
        {isLiked ? (
          <GoHeartFill className="text-xl text-custom-red" />
        ) : (
          <GoHeart className="text-xl" />
        )}
      </p>

      <p className="text-sm">{likeCount !== 0 && likeCount}</p>
    </div>
  );
};

export default LikeButton;
