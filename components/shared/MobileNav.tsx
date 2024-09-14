"use client";

import { CgMenu } from "react-icons/cg";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { DiAtom } from "react-icons/di";
import { usePathname } from "next/navigation";
import { SIDEBAR_LINKS } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "../ui/button";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <ul className="flex h-full flex-col gap-6 pt-16">
      {SIDEBAR_LINKS.map((item, index) => {
        const isActive = item.isLink
          ? pathname === item.route || pathname.includes(item.route)
          : pathname === "/create-post" || pathname === "share";
        return (
          <li key={index}>
            {item.isLink ? (
              <Link
                href={item.route}
                className={`${isActive ? "bg-dark-300 fill-light-900 text-light-900" : "fill-light-600 text-light-600"} flex-start w-full cursor-pointer gap-4 rounded-lg p-3 text-sm hover:bg-dark-300 hover:fill-light-900 hover:text-light-900`}
              >
                <item.icon width="20px" height="20px" />
                {item.name}
              </Link>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger
        className="text-dark-100_light-900 ml-1 cursor-pointer text-2xl sm:hidden"
        asChild
      >
        <CgMenu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-light-900_dark-200 overflow-y-auto border-none"
      >
        <Link
          href="/"
          className="text-primary-100_primary-500 flex-start w-max gap-2 text-xl font-bold"
        >
          <DiAtom className="text-3xl" />
          <h1 className="flex-start gap-2">
            Tech
            <span className="text-primary-500_primary-100 bg-primary-100_primary-500 rounded-lg p-[2px] px-2">
              Flow
            </span>
          </h1>
        </Link>
        <div className="flex grow flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    Log In
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
