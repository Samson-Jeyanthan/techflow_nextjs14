"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { MdEdit, MdDelete } from "react-icons/md";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    if (type === "Question") {
      // Delete question
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });
    } else if (type === "Answer") {
      // Delete answer
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <p
          className="cursor-pointer text-xl text-dark-100 dark:text-light-900"
          onClick={handleEdit}
        >
          <MdEdit />
        </p>
      )}

      <p
        className="cursor-pointer text-xl text-custom-red"
        onClick={handleDelete}
      >
        <MdDelete />
      </p>
    </div>
  );
};

export default EditDeleteAction;
