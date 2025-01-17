"use server";

import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { TCreateResourceParams } from "./shared.types";
import Tag from "@/database/tag.model";
import Resource from "@/database/resource.model";

export async function createResourceAction(params: TCreateResourceParams) {
  try {
    connectToDatabase();

    const {
      title,
      description,
      media,
      websiteLink,
      tags,
      author,
      communityId,
      path,
    } = params;

    console.log("params", params);

    const resource = await Resource.create({
      title,
      description,
      media,
      websiteLink,
      communityId,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, // try to find an existing tag
        {
          $setOnInsert: { name: tag }, // if no tag is found, it creates a new one
          $push: { resources: resource._id }, // and adds the resource id into the posts
        },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Resource.findByIdAndUpdate(resource._id, {
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

export async function getAllResourcesAction() {
  try {
    connectToDatabase();

    const resources = await Resource.find({})
      .populate("tags")
      .populate("author");

    return { resources };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
