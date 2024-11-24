"use client";

import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const CommentCard = ({ commentData }: any) => {
  return (
    <div className="flex items-start justify-start gap-2">
      <Link
        href={`/profile/${commentData.author.clerkId}`}
        className="flex items-center gap-2"
      >
        <Image
          src={
            commentData.author.avatar || "/images/default-user-profile-pic.png"
          }
          alt={commentData.author.username}
          width={512}
          height={512}
          className="size-9 rounded-full bg-light-700 object-cover text-sm dark:bg-dark-400"
        />
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Link
            href={`/profile/${commentData.author.clerkId}`}
            className="text-dark-200_light-700 flex flex-col gap-0 text-xs lowercase"
          >
            @{commentData.author.username}
          </Link>
          <p className="text-light-500_dark-500 text-xs">
            {getTimestamp(new Date(commentData.createdAt))}
          </p>
        </div>
        <p className="text-dark-100_light-850 text-sm">{commentData.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
