"use server";

import Community from "@/database/community.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";

export async function createCommunity(params: any) {
  try {
    connectToDatabase();

    const { name, bio, profilePhoto, coverPhoto, createdBy, path } = params;

    await Community.create({
      name,
      bio,
      profilePhoto,
      coverPhoto,
      createdBy,
    });

    // TODO: create an interaction record for the user's create-community action

    // TODO: increment author's reputation by +5 for create-community

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllCommunities() {
  try {
    connectToDatabase();

    const communities = await Community.find({});

    return { communities };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCommunityInfoAction(params: any) {
  try {
    connectToDatabase();

    const { communityId } = params;

    const community = await Community.findById(communityId)
      .populate({
        path: "members",
        model: User,
        select: "_id clerkId name username avatar",
      })
      .populate({
        path: "admins",
        model: User,
        select: "_id clerkId name username avatar",
      })
      .populate({
        path: "createdBy",
        model: User,
        select: "_id clerkId name username avatar",
      });

    return { community };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
