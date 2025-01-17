"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { IToggleSaveParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Save from "@/database/save.model";
import Question from "@/database/question.model";
import Post from "@/database/post.model";
import { FilterQuery } from "mongoose";
import Tag from "@/database/tag.model";

export async function saveAnItemAction(params: IToggleSaveParams) {
  try {
    connectToDatabase();

    const { userId, saveFor, savedItemId, isSaved, path } = params;

    console.log(params, "params");

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    let updateQuery = {};

    if (isSaved) {
      await Save.deleteOne({ savedItemId });
    } else {
      await Save.create({
        userId,
        savedItemId,
        savedFor: saveFor,
      });
    }

    if (isSaved) {
      updateQuery = {
        $pull: { saved: savedItemId },
      };
    } else {
      updateQuery = {
        $addToSet: { saved: savedItemId },
      };
    }

    await User.findByIdAndUpdate(userId, updateQuery, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedItemsAction(params: any) {
  try {
    connectToDatabase();

    const { userId, reqFor, searchQuery } = params;

    const query: FilterQuery<typeof Save> = {};

    if (reqFor) {
      query.$or = [{ savedFor: { $regex: new RegExp(reqFor, "i") } }];
    }

    const savedItems = await Save.find({ userId, ...query }).populate({
      path: "savedItemId",
      model: reqFor === "Question" ? Question : Post,
      match: searchQuery
        ? {
            $or: [
              { title: { $regex: new RegExp(searchQuery, "i") } },
              { content: { $regex: new RegExp(searchQuery, "i") } },
              { description: { $regex: new RegExp(searchQuery, "i") } },
            ],
          }
        : {},
      populate: [
        {
          path: "author",
          model: User,
          select: "_id clerkId name username avatar",
        },
        {
          path: "tags",
          model: Tag,
        },
      ],
    });

    // Filter out results where `savedItemId` is null (no match in `match`)
    const savedItemIds = savedItems
      .filter((item) => item.savedItemId) // Remove null `savedItemId` entries
      .map((item) => item.savedItemId);

    return { savedItemIds };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
