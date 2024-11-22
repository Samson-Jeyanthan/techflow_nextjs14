"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createComment } from "@/lib/actions/comment.action";

const CommentInput = ({ postId, currentUserId, commentChange }: any) => {
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    console.log(comment, postId, currentUserId);
    try {
      const res = await createComment({
        postId: JSON.parse(postId),
        content: comment,
        author: currentUserId,
        parentCommentId: null,
        path: "",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setComment("");
      commentChange && commentChange();
    }
  };

  return (
    <div className="mt-4 flex w-full items-center justify-center gap-4 border-t border-light-700 pt-4 dark:border-dark-350">
      <Input
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="no-focus text-dark-100_light-850 rounded-lg bg-transparent text-sm placeholder:text-light-500 placeholder:dark:text-dark-500"
      />
      {comment && (
        <Button
          onClick={handleComment}
          className="w-20 bg-primary-500 text-light-900"
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default CommentInput;
