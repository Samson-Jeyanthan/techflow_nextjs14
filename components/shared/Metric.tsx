import UserProfileImg from "./UserProfileImg";

interface MetricProps {
  imgUrl?: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
  userName?: string;
  userId?: string;
}

const Metric = ({
  imgUrl,
  userName,
  userId,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {
  // const metricContent = () => {};
  return (
    <div className="flex-center flex-wrap gap-1">
      {imgUrl && (
        <div className="flex-center gap-1 text-xs">
          <UserProfileImg src={imgUrl} userName={userName} userId={userId} />
          <p>time ago</p>
        </div>
      )}

      {!imgUrl && (
        <>
          <p>ICN</p>
          <p className={`${textStyles} flex items-center gap-1`}>
            {value}

            <span
              className={`line-clamp-1 text-xs ${isAuthor ? "max-sm:hidden" : ""}`}
            >
              {title}
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default Metric;
