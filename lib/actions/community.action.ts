"use server";

import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";
import Post from "@/database/post.model";
import Community from "@/database/community.model";
import {
  IDeleteCommunityParams,
  TCreateCommunityParams,
  TEditCommunityParams,
  TGetCommunityByIdParams,
  TGetCommunityContentsParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";

export async function createCommunity(params: TCreateCommunityParams) {
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

export async function getAllCommunities(params: any) {
  try {
    connectToDatabase();

    const { searchQuery } = params;

    const query: FilterQuery<typeof Community> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { bio: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    const communities = await Community.find(query);

    return { communities };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCommunityByIdAction(params: TGetCommunityByIdParams) {
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

export async function editCommunityAction(params: TEditCommunityParams) {
  try {
    connectToDatabase();

    const { communityId, name, bio, profilePhoto, coverPhoto, path } = params;

    const community = await Community.findById(communityId)
      .populate("members")
      .populate("admins");

    if (!community) {
      throw new Error("Community not found");
    }

    community.name = name;
    community.bio = bio;
    community.profilePhoto = profilePhoto;
    community.coverPhoto = coverPhoto;

    await community.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getCommunityPostsAction(
  params: TGetCommunityContentsParams
) {
  try {
    connectToDatabase();

    const { id: communityId, page = 1, pageSize = 20 } = params;

    console.log(communityId, "communityId");

    const skipAmount = (page - 1) * pageSize;

    const totalPosts = await Post.countDocuments({
      communityId,
    });

    const communityPosts = await Post.find({ communityId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: -1, views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name username avatar");

    const isNextPost = totalPosts > skipAmount + communityPosts.length;

    return { totalPosts, posts: communityPosts, isNextPost };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCommunityQuestionsAction(
  params: TGetCommunityContentsParams
) {
  try {
    connectToDatabase();

    const { id: communityId, page = 1, pageSize = 20 } = params;

    console.log(communityId, "communityId");

    const skipAmount = (page - 1) * pageSize;

    const totalQuestions = await Question.countDocuments({
      communityId,
    });

    const communityQuestions = await Question.find({ communityId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: -1, views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name username avatar")
      .populate("communityId", "_id name");
    const isNextQuestion =
      totalQuestions > skipAmount + communityQuestions.length;

    return { totalQuestions, questions: communityQuestions, isNextQuestion };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function joinCommunityAction(params: any) {
  try {
    connectToDatabase();

    const { communityId, hasJoined, userId, path } = params;

    let updateQuery = {};

    if (hasJoined) {
      updateQuery = {
        $pull: { members: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { members: userId },
      };
    }

    const community = await Community.findByIdAndUpdate(
      communityId,
      updateQuery,
      { new: true }
    );

    if (!community) {
      return {
        status: 400,
        message: "Community not found",
      };
    }

    revalidatePath(path);

    return {
      status: 200,
      message: "Success",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllMembersOfCommunityAction(params: any) {
  try {
    connectToDatabase();

    const { communityId } = params;

    const community = await Community.findById(communityId)
      .populate({
        path: "members",
        model: User,
        select: "_id clerkId name username avatar followings followers",
      })
      .sort({ createdAt: -1 });

    return { community };
  } catch (error) {
    console.log(error);
  }
}

export async function communityAdminAction(params: any) {
  try {
    connectToDatabase();

    const { communityId, adminUserId, isAdmin, path } = params;

    let updateQuery = {};

    if (isAdmin) {
      updateQuery = {
        $pull: { admins: adminUserId },
        $addToSet: { members: adminUserId },
      };
    } else {
      updateQuery = {
        $pull: { members: adminUserId },
        $addToSet: { admins: adminUserId },
      };
    }

    const community = await Community.findByIdAndUpdate(
      communityId,
      updateQuery,
      { new: true }
    );

    if (!community) {
      return {
        status: 400,
        message: "Community not found",
      };
    }

    revalidatePath(path);

    return {
      status: 200,
      message: "Success",
    };
  } catch (error) {
    console.log(error);
  }
}

export async function removeMemberAction(params: any) {
  try {
    connectToDatabase();

    const { communityId, userId, isAdmin, path } = params;

    console.log(params, "params");

    let updateQuery = {};

    if (isAdmin) {
      updateQuery = {
        $pull: { admins: userId },
      };
    } else {
      updateQuery = {
        $pull: { members: userId },
      };
    }

    const community = await Community.findByIdAndUpdate(
      communityId,
      updateQuery,
      { new: true }
    );

    if (!community) {
      return {
        status: 400,
        message: "Community not found",
      };
    }

    revalidatePath(path);

    return {
      status: 200,
      message: "Success",
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllAdminsOfCommunityAction(params: any) {
  try {
    connectToDatabase();

    const { communityId } = params;

    const admins = await Community.findById(communityId)
      .populate({
        path: "admins",
        model: User,
      })
      .sort({ createdAt: -1 });

    const creator = await Community.findById(communityId).populate({
      path: "createdBy",
      model: User,
    });

    return { admins, creator };
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCommunityAction(params: IDeleteCommunityParams) {
  try {
    connectToDatabase();

    const { communityId } = params;

    await Community.deleteOne({ _id: communityId });

    return {
      status: 200,
      message: "Success",
    };
  } catch (error) {
    console.log(error);
  }
}
