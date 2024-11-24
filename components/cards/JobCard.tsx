import { formatCountValue, getFormattedDate, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { ParseHTML } from "../shared";
import { Badge } from "../ui/badge";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import Link from "next/link";

const JobCard = ({
  _id,
  title,
  author,
  description,
  salary,
  salaryPer,
  salaryCurrency,
  location,
  deadline,
  workMode,
  employmentType,
  createdAt,
}: any) => {
  return (
    <div className="relative flex w-full items-start gap-4 rounded-2xl bg-light-900 p-8 shadow-sm dark:bg-dark-250">
      <Image
        src={author.avatar || "/images/default-user-profile-pic.png"}
        alt={author.name}
        width={128}
        height={128}
        className="size-10 rounded-full bg-light-700 object-cover dark:bg-dark-400"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Link
            href={`/job/${_id}`}
            className="text-dark-100_light-900 text-xl font-semibold"
          >
            {title}
          </Link>

          <div>
            <h2 className="text-dark-500_light-600 rounded-md border border-light-750 p-2 text-base font-semibold dark:border-dark-350">
              <span className="uppercase">{salaryCurrency}</span>
              &nbsp;
              {formatCountValue(salary)} &nbsp;/&nbsp;
              {salaryPer}
            </h2>
          </div>
        </div>
        <p className="text-dark-500_light-600 flex flex-wrap items-center gap-4 text-xs">
          <span className="flex items-center gap-1 lowercase">
            <HiOutlineOfficeBuilding className="text-lg" />
            called by {author.username}
          </span>
          <span className="flex items-center gap-1 lowercase">
            <CiLocationOn className="text-lg" />
            {location}
          </span>
          <span className="flex items-center gap-2">
            <IoMdTime className="text-base" />
            posted &nbsp;
            {getTimestamp(createdAt)}
          </span>
        </p>

        <ParseHTML
          data={description}
          className="text-dark-500_light-600 line-clamp-3 text-xs"
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="text-dark-400_light-500 bg-light-800_dark-350 rounded-md border-none px-4 py-2 text-[10px] uppercase">
              {workMode}
            </Badge>
            <Badge className="text-dark-400_light-500 bg-light-800_dark-350 rounded-md border-none px-4 py-2 text-[10px] uppercase">
              {employmentType}
            </Badge>
          </div>

          <p className="text-dark-500_light-600 text-xs">
            Apply before - {getFormattedDate(deadline)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
