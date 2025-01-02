import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { DiAtom } from "react-icons/di";
import { Theme } from "../options";
import MobileNav from "./MobileNav";
import GlobalSearch from "./search/GlobalSearch";

const Navbar = () => {
  return (
    <nav className="text-dark-100_light-900 bg-light-900_dark-200 flex-between fixed top-0 z-50 w-full px-8 py-3 shadow-sm dark:shadow-none">
      <Link
        href="/"
        className="text-primary-100_primary-500 flex-start w-max gap-2 text-xl font-bold"
      >
        <DiAtom className="text-3xl" />
        <h1>TechFlow</h1>
      </Link>

      <GlobalSearch />

      <div className="flex-between gap-2">
        <Theme />

        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
