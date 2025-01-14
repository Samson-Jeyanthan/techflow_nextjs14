import Image from "next/image";
import { LikeButton, RenderTag, UserProfileImg } from "../shared";
import { getTimestamp } from "@/lib/utils";
import Link from "next/link";
import { CommentInput } from "../inputs";
import { CommentModal } from "../modals";
import React from "react";
import { PostOptions } from "../options";

interface Props {
  _id: string;
  title: string;
  description: string;
  tags: {
    _id: string;
    name: string;
  }[];
  media: [
    {
      mediaType: string;
      mediaURL: string;
      thumbnailURL: string;
    },
  ];
  author: any;
  createdAt: Date;
  views: number;
  likes: string[];
  currentUserId: string;
  isLiked: boolean;
  likesCount: number;
  commentsCounts: number;
}

const PostCard = async ({
  _id,
  title,
  description,
  tags,
  media,
  author,
  createdAt,
  views,
  currentUserId,
  isLiked,
  likesCount,
  commentsCounts,
}: Props) => {
  const parsedAuthor = JSON.stringify(author._id);
  return (
    <div className="w-full rounded-xl bg-light-900 p-7 shadow-md dark:bg-dark-250 sm:px-9">
      <header className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          <UserProfileImg
            src={author.avatar}
            userId={author.clerkId}
            className="size-10 rounded-full object-cover"
          />
          <p className="text-dark-100_light-850 flex flex-col gap-0 text-sm">
            <Link href={`/profile/${author.clerkId}`}>{author.username}</Link>

            <span className="text-light-500_dark-500 text-xs">
              posted {getTimestamp(createdAt)}
            </span>
          </p>
        </div>
        {JSON.parse(currentUserId) === JSON.parse(parsedAuthor) && (
          <PostOptions postId={JSON.stringify(_id)} />
        )}
      </header>

      <p className="text-dark-100_light-850 mt-8">
        {title === "" ? description : title}
      </p>

      <div className="flex w-full gap-2">
        {media?.length > 0 &&
          media?.map((item, index) => (
            <Image
              key={index}
              src={item.mediaURL}
              alt={title}
              width={1200}
              height={1200}
              className="mt-6 size-full max-h-[28rem] rounded-lg bg-dark-100 object-contain"
            />
          ))}
      </div>

      {title !== "" && (
        <p className="text-dark-100_light-850 font-regular mt-4 line-clamp-6 text-sm">
          {description}
        </p>
      )}

      {tags.length > 0 && (
        <div className="mt-3.5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-start gap-8 ">
        <LikeButton
          userId={JSON.parse(currentUserId)}
          postId={JSON.stringify(_id)}
          likeCounts={likesCount}
          isUserLiked={isLiked}
        />
        <CommentModal
          postId={JSON.stringify(_id)}
          currentUserId={JSON.parse(currentUserId)}
          commentsCount={commentsCounts}
        />
      </div>

      <CommentInput
        postId={JSON.stringify(_id)}
        currentUserId={JSON.parse(currentUserId)}
        path=""
      />
    </div>
  );
};

export default PostCard;
