"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  communityAdminAction,
  removeMemberAction,
} from "@/lib/actions/community.action";
import { usePathname } from "next/navigation";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const PeopleOptions = ({ isMember, communityId, userId }: any) => {
  const pathname = usePathname();

  const handleDelete = async () => {
    await removeMemberAction({
      communityId,
      isAdmin: !isMember,
      userId: JSON.parse(userId),
      path: pathname,
    });
  };

  const handleMember = async () => {
    await communityAdminAction({
      communityId,
      adminUserId: JSON.parse(userId),
      isAdmin: !isMember,
      path: pathname,
    });
  };

  return (
    <Menubar className="relative border-none bg-transparent p-0">
      <MenubarMenu>
        <MenubarTrigger className="hover:text-dark-100_light-900 cursor-pointer p-2 text-xl text-light-500">
          <BsThreeDots />
        </MenubarTrigger>
        <MenubarContent className="bg-light-850_dark-200 absolute -right-5 z-[99] min-w-36 gap-10 rounded-lg border border-solid p-1.5 shadow-md shadow-dark-100/25 dark:border-dark-300">
          <MenubarItem
            className="bg-light-850_dark-200 hover:bg-light-800_dark-300 hover:text-dark-100_light-900 hover:fill-dark-100_light-900 w-32 cursor-pointer rounded fill-light-500 text-light-500"
            onClick={handleMember}
          >
            {isMember ? (
              <p className="flex-center gap-2 pr-2 text-xs">
                <BiPlus className="text-xl" />
                Make Admin
              </p>
            ) : (
              <p className="flex-center gap-2 pr-2 text-xs">
                <BiMinus className="text-xl" />
                Remove&nbsp;admin
              </p>
            )}
          </MenubarItem>

          <MenubarItem
            className="bg-light-850_dark-200 hover:bg-light-800_dark-300 hover:text-dark-100_light-900 hover:fill-dark-100_light-900 flex w-32 cursor-pointer gap-3 rounded fill-custom-red text-xs text-custom-red"
            onClick={handleDelete}
          >
            <MdDelete className="text-lg" />
            Remove User
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default PeopleOptions;
