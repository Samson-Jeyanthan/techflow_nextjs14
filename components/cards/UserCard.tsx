import { getTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { RenderTag } from "../shared";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    avatar: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });
  return (
    <article className="max-xs:min-w-full flex-center w-full flex-col rounded-xl bg-light-900 p-4 shadow-sm dark:bg-dark-250 sm:w-64">
      <Link
        href={`/profile/${user.clerkId}`}
        className="flex-center w-full flex-col"
      >
        <Image
          src={user.avatar || "/images/default_profile_pic.png"}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-full bg-light-700 object-cover dark:bg-dark-400"
        />
        <div className="mt-4 text-center">
          <h3 className="text-dark-100_light-850 line-clamp-1 text-base font-semibold">
            {user.name}
          </h3>
          <p className="text-dark-100_light-850 text-xs lowercase">
            @{user.username}
          </p>
        </div>
      </Link>

      <div className="mt-4">
        {interactedTags.length > 0 ? (
          <div className="flex items-center gap-2">
            {interactedTags.map((tag, index) => (
              <RenderTag key={index} _id={tag._id} name={tag.name} />
            ))}
          </div>
        ) : (
          <Badge>No tags yet</Badge>
        )}
      </div>
    </article>
  );
};

export default UserCard;
