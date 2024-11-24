"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { deletePostAction } from "@/lib/actions/post.action";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";

const PostOptions = ({ postId }: { postId: string }) => {
  const pathname = usePathname();

  const handleDelete = async () => {
    await deletePostAction({
      postId: JSON.parse(postId),
      path: pathname,
    });
  };

  return (
    <Menubar className="relative border-none bg-transparent p-0">
      <MenubarMenu>
        <MenubarTrigger className="hover:text-dark-100_light-900 cursor-pointer p-2 text-xl text-light-500">
          <BsThreeDots />
        </MenubarTrigger>
        <MenubarContent className="bg-light-850_dark-200 absolute -right-5 z-[99] min-w-32 gap-10 rounded-lg border border-solid p-2 shadow-md shadow-dark-100/25 dark:border-dark-300">
          <MenubarItem className="bg-light-850_dark-200 hover:bg-light-800_dark-300 hover:text-dark-100_light-900 hover:fill-dark-100_light-900 w-32 cursor-pointer rounded fill-light-500 text-light-500">
            <Link
              href={`/post/edit/${JSON.parse(postId)}`}
              className="flex gap-3"
            >
              <MdEdit className="text-xl" />
              Edit Post
            </Link>
          </MenubarItem>

          <MenubarItem
            className="bg-light-850_dark-200 hover:bg-light-800_dark-300 hover:text-dark-100_light-900 hover:fill-dark-100_light-900 flex w-32 cursor-pointer gap-3 rounded fill-custom-red text-custom-red"
            onClick={handleDelete}
          >
            <MdDelete className="text-xl" />
            Delete Post
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default PostOptions;
