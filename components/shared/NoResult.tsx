import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <h2 className="text-dark-100_light-800 mt-8 font-semibold">{title}</h2>
      <p className="font-regular my-3.5 max-w-md text-center text-light-500">
        {description}
      </p>
      <Link href={link}>
        <Button className="bg-primary-100 text-sm font-medium text-light-900">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
