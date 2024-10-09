"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { IGetTopInteractedTagsParams, TGetAllTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

export async function getTopInteractedTags(
  params: IGetTopInteractedTagsParams
) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    //   Find the top 3 most interacted tags
    return [
      { _id: "1", name: "Tag 1" },
      { _id: "2", name: "Tag 2" },
      { _id: "3", name: "Tag 3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: TGetAllTagsParams) {
  try {
    connectToDatabase();

    const tags = await Tag.find({});
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
