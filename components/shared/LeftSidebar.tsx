"use client";

import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { SIDEBAR_LINKS } from "@/constants";
import Link from "next/link";
import { ProfileIcon } from "@/public/svgs";
import { UploadDrawer } from "../modals";

const LeftSidebar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const isProfile = pathname.includes(`/profile/${userId}`);

  return (
    <aside className="bg-light-900_dark-200 sticky left-0 top-0 z-10 flex h-screen flex-col justify-between overflow-y-auto p-4 pt-20 text-light-900 shadow-sm dark:shadow-none max-sm:hidden lg:w-60 2xl:w-64 2xl:p-6 2xl:pt-24">
      <ul className="flex flex-1 flex-col gap-[10px] 2xl:gap-4">
        {SIDEBAR_LINKS.map((item, index) => {
          const isActive =
            (pathname.startsWith(item.route) && item.route.length > 1) ||
            pathname === item.route;

          return (
            <li key={index}>
              <Link
                href={item.route}
                className={`${isActive ? "text-dark-100_light-900 fill-dark-100_light-900 bg-primary-500/20" : "text-dark-500_light-600 fill-dark-500 dark:fill-light-600"} flex-start  hover:fill-dark-100_light-900 hover:text-dark-100_light-900 w-full cursor-pointer gap-4 rounded-lg p-3 text-sm hover:bg-primary-500/20`}
              >
                <item.icon width="20px" height="20px" />
                <p className="max-lg:hidden">{item.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>

      <SignedIn>
        <div className="flex flex-col gap-3">
          <Link
            href={`/profile/${userId}`}
            className={`${isProfile ? "text-dark-100_light-900 bg-primary-500/20 fill-dark-100 dark:fill-light-900" : "text-dark-500_light-600 fill-dark-500 dark:fill-light-600"} flex-center hover:text-dark-100_light-900 hover:fill-dark-100_light-900 cursor-pointer gap-4 rounded-lg border border-primary-500/20 p-3 text-sm hover:bg-primary-500/20`}
          >
            <ProfileIcon width="20px" height="20px" />
            <p className="max-lg:hidden">Profile</p>
          </Link>

          <UploadDrawer />
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="bg-primary-100_primary-500 w-full text-sm font-medium text-light-900">
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
