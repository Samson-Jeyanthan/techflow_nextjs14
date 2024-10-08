"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { IGetTopInteractedTagsParams } from "./shared.types";

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
