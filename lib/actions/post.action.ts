"use server";

import Post from "@/database/post.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";
import { TCreatePostParams } from "./shared.types";

export async function createPost(params: TCreatePostParams) {
  try {
    connectToDatabase();

    const { title, description, postImage, tags, author, groupId, path } =
      params;

    const post = await Post.create({
      title,
      description,
      postImage,
      groupId,
      author,
    });

    const tagDocuments = [];

    if (tags?.length === 0 || !tags) return;

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, // try to find an existing tag
        {
          $setOnInsert: { name: tag }, // if no tag is found, it creates a new one
          $push: { posts: post._id }, // and adds the post id into the posts
        },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Post.findByIdAndUpdate(post._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // TODO: create an interaction record for the user's create-post action

    // TODO: increment author's reputation by +5 for create-post

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllPosts() {
  try {
    connectToDatabase();

    const posts = await Post.find({});

    return { posts };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
