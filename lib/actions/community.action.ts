"use server";

import Community from "@/database/community.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";

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
