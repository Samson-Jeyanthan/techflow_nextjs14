import { CreatePostForm } from "@/components/forms";
import { getPostByIdAction } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { IParamsProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";

const EditPost = async ({ params }: IParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const result = await getPostByIdAction({ postId: params.id });

  return (
    <section>
      <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
        Edit Question
      </h1>

      <div className="mt-9">
        <CreatePostForm
          type="edit"
          currentUserId={mongoUser._id}
          postDetails={JSON.stringify(result)}
        />
      </div>
    </section>
  );
};

export default EditPost;
