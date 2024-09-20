import Link from "next/link";
import React from "react";
// import { Badge } from "@/components/ui/badge";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <div className="text-dark-400_light-500 bg-light-750_dark-350 rounded-md border-none px-4 py-2 text-xs uppercase">
        {name}
      </div>

      {/* {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )} */}
    </Link>
  );
};

export default RenderTag;
