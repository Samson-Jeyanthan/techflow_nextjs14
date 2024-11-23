"use server";

import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import Post from "@/database/post.model";
import Tag from "@/database/tag.model";
import { IGetPostByIdParams, TCreatePostParams } from "./shared.types";
import User from "@/database/user.model";

export async function createPostAction(params: TCreatePostParams) {
  try {
    connectToDatabase();

    const { title, description, media, tags, author, groupId, path } = params;

    const post = await Post.create({
      title,
      description,
      media,
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

export async function getAllPosts(params: any) {
  try {
    connectToDatabase();

    const posts = await Post.find({})
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "tags",
        model: Tag,
      })
      .sort({ createdAt: -1 });

    return { posts };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function likePost(params: any) {
  try {
    connectToDatabase();

    const { postId, userId, hasLiked, path } = params;

    let updateQuery = {};

    if (hasLiked) {
      updateQuery = {
        $pull: { likes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { likes: userId },
      };
    }

    const post = await Post.findByIdAndUpdate(postId, updateQuery, {
      new: true,
    });

    if (!post) {
      throw new Error("Post not found");
    }

    revalidatePath(path);
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPostByIdAction(params: IGetPostByIdParams) {
  try {
    connectToDatabase();

    const { postId } = params;

    const post = await Post.findById(postId)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "tags",
        model: Tag,
      });

    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editPostAction(params: any) {
  try {
    connectToDatabase();

    const { postId, title, description, media, path } = params;

    const post = await Post.findById(postId).populate("tags");

    if (!post) {
      throw new Error("Post not found");
    }

    post.title = title;
    post.description = description;
    post.media = media;

    await post.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
