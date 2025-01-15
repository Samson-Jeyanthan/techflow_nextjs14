import React from "react";
import { Button } from "../ui/button";

type Props = {
  isSmall?: boolean;
};

const FollowButton = ({ isSmall }: Props) => {
  return (
    <Button
      className={`${isSmall ? "h-8 rounded-full py-1" : "rounded-md"} bg-primary-100 text-white`}
    >
      Follow
    </Button>
  );
};

export default FollowButton;
