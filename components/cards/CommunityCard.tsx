import Image from "next/image";
import Link from "next/link";

interface Props {
  community: {
    _id: string;
    name: string;
    bio: string;
    profilePhoto: string;
    coverPhoto: string;
  };
}

const CommunityCard = async ({ community }: Props) => {
  return (
    <Link
      href={`/community/${community._id}`}
      className="max-xs:min-w-full flex-center w-full flex-col gap-3 rounded-xl bg-light-900 p-4 pt-5 shadow-sm dark:bg-dark-250 sm:w-64"
    >
      <Image
        src={
          community.profilePhoto || "/images/default-community-profile-pic.png"
        }
        alt={community.name}
        width={100}
        height={100}
        className="size-32 max-h-32 rounded-full bg-light-700 object-cover dark:bg-dark-400"
      />

      <h3 className="text-dark-100_light-850 line-clamp-1 text-base font-semibold">
        {community.name}
      </h3>
      <p className="text-dark-100_light-850 line-clamp-2 text-center text-xs lowercase">
        {community.bio}
      </p>
    </Link>
  );
};

export default CommunityCard;
