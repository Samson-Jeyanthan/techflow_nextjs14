import Image from "next/image";
import { LikeButton, RenderTag, UserProfileImg } from "../shared";
import { getTimestamp } from "@/lib/utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { CommentInput } from "../inputs";
import { CommentModal } from "../modals";

interface Props {
  _id: string;
  title: string;
  description: string;
  tags: {
    _id: string;
    name: string;
  }[];
  postImage: string;
  author: any;
  createdAt: Date;
  views: number;
  likes: string[];
}

const PostCard = ({
  _id,
  title,
  description,
  tags,
  postImage,
  author,
  createdAt,
  views,
}: Props) => {
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
        <BsThreeDotsVertical />
      </header>

      <p className="text-dark-100_light-850 mt-8">
        {title === "" ? description : title}
      </p>

      {postImage !== "" && (
        <Image
          src={postImage}
          alt={title}
          width={1200}
          height={1200}
          className="mt-6 size-full rounded-lg object-cover"
        />
      )}

      {title !== "" && (
        <p className="text-dark-100_light-850 mt-4">{description}</p>
      )}

      {tags.length > 0 && (
        <div className="mt-3.5 flex flex-wrap gap-2 border">
          {tags.map((tag) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-start gap-8 ">
        <LikeButton likeCounts={0} isUserLiked={false} />
        <CommentModal />
      </div>

      <CommentInput />
    </div>
  );
};

export default PostCard;
