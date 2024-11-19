"use client";

import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

type Props = {
  likeCounts: number;
  isUserLiked: boolean;
};

const LikeButton = ({ likeCounts, isUserLiked }: Props) => {
  const [isLiked, setIsLiked] = useState(isUserLiked || false);
  const [likeCount, setLikeCount] = useState(likeCounts);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
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
