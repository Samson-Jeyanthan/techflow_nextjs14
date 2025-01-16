"use client";

import { CommentIcon } from "@/public/svgs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { CommentInput } from "../inputs";
import { getAllComments } from "@/lib/actions/comment.action";
import { CommentCard } from "../client";
// import { Pagination } from "../shared";

const CommentModal = ({ commentsCount, postId, currentUserId }: any) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isComment, setIsComment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (open) {
        const res = await getAllComments({
          isClientSide: true,
          postId: JSON.parse(postId),
        });
        setData(res);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isComment]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-dark-100_light-850 flex cursor-pointer gap-2 fill-black text-sm dark:fill-white">
        <CommentIcon width="20px" height="20px" /> {commentsCount}
      </DialogTrigger>
      <DialogContent
        className="bg-light-900_dark-300 flex h-[75vh] flex-col items-center rounded-2xl p-0 shadow-md"
        aria-describedby={undefined}
      >
        <DialogTitle className="text-dark-100_light-900 bg-light-900_dark-300 flex-center sticky top-0 h-16 gap-2 rounded-2xl p-4">
          {commentsCount}
          <span>Comments</span>
        </DialogTitle>
        <div className="z-0 flex w-full flex-col items-start gap-6 overflow-y-scroll px-5">
          {data?.map((comment: any, index: number) => (
            <CommentCard key={index} commentData={comment} />
          ))}
        </div>
        {/* <Pagination isNext={data?.length === 20} pageNumber={1} /> */}
        <DialogClose className="text-light-500_dark-500 flex-center bg-light-900_dark-300 absolute -right-8 -top-8 size-9 cursor-pointer rounded-full text-xl hover:text-light-900">
          <MdClose />
        </DialogClose>
        <footer className="fixed bottom-0 h-[5.5rem] w-full px-4">
          <CommentInput
            postId={postId}
            currentUserId={currentUserId}
            path="/"
            commentChange={() => setIsComment(true)}
          />
        </footer>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
