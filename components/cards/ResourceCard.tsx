import { getTimestamp } from "@/lib/utils";
import React from "react";
import { Metric, RenderTag, Votes } from "../shared";

interface Props {
  _id: string;
  title: string;
  description: string;
  media: string;
  author: any;
  createdAt: Date;
  upvotes: any[];
  downvotes: any[];
  clerkId: string;
  currentUserId: string;
  tags: {
    _id: string;
    name: string;
  }[];
}

const ResourceCard = ({
  _id,
  title,
  description,
  media,
  author,
  createdAt,
  upvotes,
  downvotes,
  clerkId,
  currentUserId,
  tags,
}: Props) => {
  return (
    <div className="w-full rounded-2xl bg-light-900 p-9 shadow-sm dark:bg-dark-250 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="line-clamp-1 flex text-xs text-light-500 sm:hidden">
            {getTimestamp(createdAt)}
          </span>

          <h3 className="line-clamp-1 flex-1 text-dark-200 dark:text-light-800 sm:text-xl sm:font-semibold">
            {title}
          </h3>
        </div>
        <div className="flex justify-end">
          <Votes
            type="answer"
            itemId={JSON.stringify(_id)}
            userId={JSON.stringify(currentUserId)}
            upvotes={upvotes.length}
            hasUpvoted={upvotes.includes(currentUserId)}
            downvotes={downvotes.length}
            hasDownvoted={downvotes.includes(currentUserId)}
          />
        </div>
        {/* <SignedIn>
            {showActionButtons && (
              <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
            )}
          </SignedIn> */}
      </div>

      <p className="text-dark-400_light-500 mt-5 line-clamp-2 text-sm">
        {description}
      </p>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="mt-8 flex w-full items-start">
        <Metric
          imgUrl={author.avatar || "/images/default-user-profile-pic.png"}
          userId={author.clerkId}
          userName={author.name}
          isAuthor
          title={`- shared ${getTimestamp(createdAt)}`}
          textStyles="text-xs text-light-500"
        />
      </div>
    </div>
  );
};

export default ResourceCard;
