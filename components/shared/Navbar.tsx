import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { DiAtom } from "react-icons/di";
import { Theme } from "../options";

const Navbar = () => {
  return (
    <nav className="text-dark-100_light-900 bg-light-900_dark-200 flex-between sticky top-0 z-50 px-8 py-4 shadow-sm dark:shadow-none">
      <Link
        href="/"
        className="text-primary-100_primary-500 flex-start gap-2 text-xl font-bold"
      >
        <DiAtom className="text-3xl" />
        <h1 className="flex-start gap-2">
          Tech
          <span className="text-primary-500_primary-100 bg-primary-100_primary-500 rounded-lg p-[2px] px-2">
            Flow
          </span>
        </h1>
      </Link>

      <p>Global Search</p>

      <div className="flex-between gap-2">
        <Theme />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#000000",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
