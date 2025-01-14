import Image from "next/image";

interface PostProps {
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
  likesCount: number;
  commentsCounts: number;
}

const AuthorPostCard = ({
  _id,
  title,
  description,
  tags,
  media,
  author,
  createdAt,
  views,
  commentsCounts,
}: PostProps) => {
  return (
    <div className="flex w-full gap-2">
      {media?.length > 0 && (
        <Image
          src={media[0].mediaURL}
          alt={title}
          width={1200}
          height={1200}
          className="size-full rounded-lg object-cover"
        />
      )}
    </div>
  );
};

export default AuthorPostCard;
