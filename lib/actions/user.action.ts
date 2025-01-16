"use server";

import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";
import {
  IFollowParams,
  IGetAllUsersParams,
  IGetUserByIdParams,
  IGetUserStatsParams,
  TCreateUserParams,
  TDeleteUserParams,
  TUpdatateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import { FilterQuery } from "mongoose";
import Post from "@/database/post.model";
import Community from "@/database/community.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({
      clerkId: userId,
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: TCreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(userData: TUpdatateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = userData;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: TDeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // delete user's all data from database

    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // delete user's questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user's answers, comments, posts, etc.

    const deletedUser = await User.findOneAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: IGetAllUsersParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptons = {};

    switch (filter) {
      case "new_users":
        sortOptons = { joinedAt: -1 };
        break;
      case "old_users":
        sortOptons = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOptons = { reputation: -1 };
        break;
      default:
        break;
    }

    const users = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptons);

    const totalUsers = await User.countDocuments(query);

    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: IGetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId })
      .populate({
        path: "followings.userId",
        select: "_id clerkId username avatar",
      })
      .populate({
        path: "followers.userId",
        select: "_id clerkId username avatar",
      });

    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });
    const totalPosts = await Post.countDocuments({ author: user._id });
    const totalCreatedCommunities = await Community.countDocuments({
      createdBy: user._id,
    });

    return {
      user,
      totalQuestions,
      totalAnswers,
      totalPosts,
      totalCreatedCommunities,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: IGetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 20 } = params;

    const skipAmount = (page - 1) * pageSize;

    const totalQuestions = await Question.countDocuments({
      author: userId,
    });

    const userQuestions = await Question.find({ author: userId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: -1, views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId username name avatar");

    const isNextQuestion = totalQuestions > skipAmount + userQuestions.length;

    return { totalQuestions, questions: userQuestions, isNextQuestion };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: IGetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 20 } = params;

    const skipAmount = (page - 1) * pageSize;

    const totalAnswers = await Answer.countDocuments({ author: userId });

    const userAnswers = await Answer.find({ author: userId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name username avatar");

    const isNextAnswer = totalAnswers > skipAmount + userAnswers.length;

    return { totalAnswers, answers: userAnswers, isNextAnswer };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserPosts(params: IGetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 20 } = params;

    const skipAmount = (page - 1) * pageSize;

    const totalPosts = await Post.countDocuments({ author: userId });

    const userPosts = await Post.find({ author: userId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: -1, views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId username name avatar");

    const isNextPost = totalPosts > skipAmount + userPosts.length;

    return { totalPosts, posts: userPosts, isNextPost };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserCreatedCommunitiesAction(
  params: IGetUserStatsParams
) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 20 } = params;

    const skipAmount = (page - 1) * pageSize;

    const communities = await Community.find({ createdBy: userId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("createdBy", "_id clerkId username name avatar");

    return { communities };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAdminCommunitiesAction(
  params: IGetUserStatsParams
) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 20 } = params;

    const skipAmount = (page - 1) * pageSize;

    const communities = await Community.find({ admins: userId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("admins", "_id clerkId username name avatar");

    return { communities };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserMemberCommunitiesAction(
  params: IGetUserStatsParams
) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 20 } = params;

    const skipAmount = (page - 1) * pageSize;

    const communities = await Community.find({ members: userId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("members", "_id clerkId username name avatar");

    return { communities };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// you follow a user -> you r follower, a user follows you -> you r following
export async function followUserAction(params: IFollowParams) {
  try {
    connectToDatabase();

    const { followerId, isFollowing, followingId, path } = params;

    //  this query for follower user
    let updateFollowerQuery = {};

    if (isFollowing) {
      updateFollowerQuery = {
        $pull: { followings: { userId: followingId } },
      };
    } else {
      updateFollowerQuery = {
        $addToSet: {
          followings: { userId: followingId, followedAt: new Date() },
        },
      };
    }

    const followerUser = await User.findByIdAndUpdate(
      followerId,
      updateFollowerQuery,
      { new: true }
    );

    if (!followerUser) {
      return {
        status: 401,
        message: "Could not do the action",
      };
    }

    // this query for following user
    let updateFollowingQuery = {};

    if (isFollowing) {
      updateFollowingQuery = {
        $pull: { followers: { followerId } },
      };
    } else {
      updateFollowingQuery = {
        $addToSet: {
          followers: { userId: followerId, followedAt: new Date() },
        },
      };
    }

    const followingUser = await User.findByIdAndUpdate(
      followingId,
      updateFollowingQuery,
      { new: true }
    );

    if (!followingUser) {
      return {
        status: 402,
        message: "User not found",
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
