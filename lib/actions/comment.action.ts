"use server";

import Comment from "@/database/comment.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import Post from "@/database/post.model";
import { IGetCommentsParams } from "./shared.types";

export async function createComment(params: any) {
  try {
    connectToDatabase();
    const { postId, parentCommentId, content, author, path } = params;

    const newComment = await Comment.create({
      postId,
      author,
      content,
      parentCommentId,
    });

    // add the comments to the post's comments array
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    revalidatePath(path);

    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllComments(params: IGetCommentsParams) {
  try {
    connectToDatabase();

    const { postId, isClientSide } = params;
    const comments = await Comment.find({ postId })
      .populate("author", "_id clerkId name username avatar")
      .sort({ createdAt: -1 });

    if (isClientSide) {
      const stringyFiedComments = JSON.stringify(comments);
      return JSON.parse(stringyFiedComments);
    } else {
      return { comments };
    }
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
}
