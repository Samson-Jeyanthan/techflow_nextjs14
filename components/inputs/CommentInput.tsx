"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CommentInput = () => {
  const [comment, setComment] = useState("");

  return (
    <div className="mt-4 flex w-full items-center justify-center gap-4 border-t border-light-700 pt-4 dark:border-dark-350">
      <Input
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="no-focus text-dark-100_light-850 rounded-lg bg-transparent text-sm placeholder:text-light-500 placeholder:dark:text-dark-500"
      />
      {comment && (
        <Button className="w-20 bg-primary-500 text-light-900">Send</Button>
      )}
    </div>
  );
};

export default CommentInput;
