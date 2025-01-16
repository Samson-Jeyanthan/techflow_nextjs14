import Image from "next/image";

const BadgeCards = ({ imgUrl, value, title }: any) => {
  return (
    <div className="flex h-28 items-center gap-4 rounded-xl bg-light-900 p-4 dark:bg-dark-250">
      <Image
        src={imgUrl}
        alt="image"
        width={512}
        height={512}
        className="size-16 rounded-md object-contain"
      />
      <div className="flex flex-col gap-1">
        <p className="text-dark-100_light-850 text-lg font-semibold">{value}</p>
        <p className="text-sm text-light-500">{title}</p>
      </div>
    </div>
  );
};

export default BadgeCards;
