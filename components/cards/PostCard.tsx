import Image from "next/image";
import { RenderTag } from "../shared";
import { getTimestamp } from "@/lib/utils";
import { BsThreeDotsVertical } from "react-icons/bs";

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
    <div className="w-full rounded-xl bg-light-900 p-7 dark:bg-dark-250 sm:px-9">
      <header className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          <Image
            src={author.avatar}
            alt={author.name}
            width={600}
            height={600}
            className="size-10 rounded-full object-cover"
          />
          <p className="text-dark-100_light-850 flex flex-col gap-0 text-sm">
            {author.username}
            <span className="text-light-500_dark-500 text-xs">
              posted on {getTimestamp(createdAt)}
            </span>
          </p>
        </div>
        <BsThreeDotsVertical />
      </header>

      <p className="text-dark-100_light-850 my-8">
        {title === "" ? description : title}
      </p>

      {postImage !== "" && (
        <Image
          src={postImage}
          alt={title}
          width={1200}
          height={1200}
          className="mt-4 size-full rounded-lg object-cover"
        />
      )}

      <p className="text-dark-100_light-850 mt-4">
        {title !== "" && description}
      </p>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.length > 0 &&
          tags.map((tag) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
          ))}
      </div>
    </div>
  );
};

export default PostCard;
