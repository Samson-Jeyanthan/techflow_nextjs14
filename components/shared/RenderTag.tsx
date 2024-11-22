import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className="flex items-center justify-between gap-2"
    >
      <Badge className="text-dark-400_light-500 bg-light-800_dark-350 rounded-md border-none px-4 py-2 text-[10px] uppercase">
        {name}
      </Badge>

      {showCount && <p className="text-xs">{totalQuestions}</p>}
    </Link>
  );
};

export default RenderTag;
