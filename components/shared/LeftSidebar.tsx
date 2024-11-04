"use client";

import { SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { SIDEBAR_LINKS } from "@/constants";
import Link from "next/link";

const LeftSidebar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="bg-light-900_dark-200 sticky left-0 top-0 z-10 flex h-screen flex-col justify-between overflow-y-auto p-4 pt-20 text-light-900 shadow-sm dark:shadow-none max-sm:hidden lg:w-60 2xl:w-64 2xl:p-6 2xl:pt-24">
      <ul className="flex flex-1 flex-col gap-[10px] 2xl:gap-4">
        {SIDEBAR_LINKS.map((item, index) => {
          const isActive = item.isLink
            ? pathname === item.route || pathname.includes(item.route)
            : pathname === "/create-post" || pathname === "share";

          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              return null;
            }
          }

          return (
            <li key={index}>
              {item.isLink ? (
                <Link
                  href={item.route}
                  className={`${isActive ? "text-dark-100_light-900 fill-dark-100_light-900 bg-primary-500/20" : "fill-light-600 text-light-600"} flex-start  hover:fill-dark-100_light-900 hover:text-dark-100_light-900 w-full cursor-pointer gap-4 rounded-lg p-3 text-sm hover:bg-primary-500/20`}
                >
                  <item.icon width="20px" height="20px" />
                  <p className="max-lg:hidden">{item.name}</p>
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              Log In
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              Sign Up
            </Button>
          </Link>
        </div>
      </SignedOut>
    </aside>
  );
};

export default LeftSidebar;
