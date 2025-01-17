import { PostForm } from "@/components/forms";
import { getPostByIdAction } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { IParamsProps } from "@/types/utils.types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const EditPost = async ({ params }: IParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const result = await getPostByIdAction({ postId: params.id });

  if (result?.author.clerkId !== userId) return redirect("/");

  return (
    <section>
      <h1 className="text-dark-100_light-900 flex-between text-3xl font-semibold">
        Edit Post
      </h1>

      <div className="mt-9">
        <PostForm
          type="edit"
          currentUserId={mongoUser?._id}
          postDetails={JSON.stringify(result)}
        />
      </div>
    </section>
  );
};

export default EditPost;
