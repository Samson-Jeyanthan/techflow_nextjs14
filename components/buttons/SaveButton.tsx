"use client";

import { saveAnItemAction } from "@/lib/actions/save.action";
import { SaveFillIcon, SaveIcon } from "@/public/svgs";
import { usePathname } from "next/navigation";

const SaveButton = ({ hasSaved, saveFor, itemId, userId }: any) => {
  const pathname = usePathname();
  const handleSave = async () => {
    await saveAnItemAction({
      isSaved: !!hasSaved,
      saveFor,
      savedItemId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname,
    });
  };
  return (
    <div
      className="flex-center text-light-500_dark-500 cursor-pointer fill-dark-100 text-xl dark:fill-light-900"
      onClick={handleSave}
    >
      {hasSaved ? (
        <SaveFillIcon width="20px" height="20px" />
      ) : (
        <SaveIcon width="20px" height="20px" />
      )}
    </div>
  );
};

export default SaveButton;
