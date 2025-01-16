"use client";

import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TagIcon } from "@/public/svgs";
import GlobalFilters from "./GlobalFilters";
import { globalSearchAction } from "@/lib/actions/general.action";

const GlobalResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([
    {
      type: "question",
      id: 1,
      title: "Next Js",
    },
    {
      type: "tag",
      id: 1,
      title: "Next Js",
    },
    {
      type: "user",
      id: 1,
      title: "Samson",
    },
  ]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);

      try {
        const res = await globalSearchAction({ query: global, type });

        setResult(JSON.parse(res));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "tag":
        return `/tags/${id}`;
      case "user":
        return `/profile/${id}`;
      default:
        return `/`;
    }
  };

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-2xl bg-light-800 py-5 shadow-lg dark:bg-dark-250">
      <GlobalFilters />
      <div className="bg-light-750_dark-350 my-5 h-px" />
      <div className="space-y-5">
        <p className="text-dark-200_light-700 px-5 text-sm">Top Match</p>
      </div>

      {isLoading ? (
        <div className="flex-center flex-col p-5">
          <ReloadIcon className="my-2 size-10 animate-spin text-primary-500" />
          <p className="text-dark-400_light-500 mt-2 text-center text-xs">
            Browsing the entire database will take a few seconds.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-5">
          {result.length > 0 ? (
            result.map((item: any, index: number) => (
              <Link
                key={index}
                href={renderLink(item.type, item.id)}
                className="hover:bg-light-750_dark-350 flex w-full cursor-pointer items-start gap-4 rounded-md fill-dark-300 px-5 py-2.5 dark:fill-light-700"
              >
                <TagIcon width="20px" height="20px" />
                <div className="flex flex-col">
                  <p className="text-dark-200_light-700 line-clamp-1 text-sm">
                    {item.title}
                  </p>
                  <p className="text-dark-500_light-600 mt-1 text-xs font-semibold capitalize">
                    {item.type}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex-center flex-col p-5">
              <p className="text-dark-400_light-500 mt-2 text-center text-xs">
                Oops! No result found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalResult;
