"use client";

import { formUrlQuery } from "@/lib/utils";
import { Button } from "../ui/button";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  pageNumber: number;
  isNext: boolean;
}
const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newURL = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newURL);
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="text-dark-100_light-850 border-0 bg-transparent hover:text-primary-100"
      >
        Prev
      </Button>
      <div className="flex-center rounded-md bg-primary-100 px-3.5 py-2">
        <p className="text-sm font-medium text-light-850">{pageNumber}</p>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="text-dark-100_light-850 border-0 bg-transparent hover:text-primary-100"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
