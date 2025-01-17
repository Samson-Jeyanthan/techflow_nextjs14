import { Schema } from "mongoose";
import { IUser } from "@/database/user.model";
import { IMediaProps } from "@/types/utils.types";

// ------------------------ question actions ------------------------------

export type TGetQuestionsParams = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
};

export type TCreateQuestionParams = {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
  communityId?: string | null;
};

export interface IGetQuestionByIdParams {
  questionId: string;
}

export interface IQuestionVoteParams {
  questionId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}

export interface IViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}

export interface IGetQuestionsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface IDeleteQuestionParams {
  questionId: string;
  path: string;
}

export interface IEditQuestionParams {
  questionId: string;
  title: string;
  content: string;
  path: string;
}

export interface IRecommendedParams {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

// ------------------------ user actions ------------------------------

export type TCreateUserParams = {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
};

export type TUpdatateUserParams = {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
};

export type TDeleteUserParams = {
  clerkId: string;
};

export interface IGetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}

export interface IGetUserByIdParams {
  userId: string;
}

export interface IGetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface IFollowParams {
  followerId: string;
  followingId: string;
  isFollowing: boolean;
  path: string;
}

// ------------------------ tag actions ------------------------------

export interface IGetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}

export interface TGetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

// ------------------------ answer actions ------------------------------

export interface ICreateAnswerParams {
  content: string;
  author: string; // User ID
  question: string; // Question ID
  path: string;
}

export interface IGetAnswersParams {
  questionId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface IAnswerVoteParams {
  answerId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}

export interface IDeleteAnswerParams {
  answerId: string;
  path: string;
}

// ------------------------ saved actions ------------------------------
export interface IToggleSaveParams {
  userId: string;
  saveFor: "QUESTION" | "POST" | "JOB" | "RESOURCE";
  savedItemId: string;
  path: string;
}

// ------------------------ post actions ------------------------------
export type TCreatePostParams = {
  title?: string;
  description?: string;
  media?: IMediaProps[];
  tags?: string[];
  author: Schema.Types.ObjectId | IUser;
  communityId?: string;
  path: string;
};

export interface IGetCommentsParams {
  isClientSide: boolean;
  postId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface IGetPostByIdParams {
  postId: string;
}

export interface IDeletePostParams {
  postId: string;
  path: string;
}

// ------------------------ job actions ------------------------------

export type TCreateJobParams = {
  title: string;
  description: string;
  workMode: string;
  employmentType: string;
  furtherDetailLink: string | undefined;
  salaryPer: string | undefined;
  salaryCurrency: string | undefined;
  salary: string | undefined;
  location: string;
  deadline: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
};

// ------------------------ community actions --------------------------

export type TCreateCommunityParams = {
  name: string;
  bio: string;
  profilePhoto: string;
  coverPhoto: string;
  createdBy: Schema.Types.ObjectId | IUser;
  path: string;
};

export type TGetCommunityByIdParams = {
  communityId: string;
};

export type TEditCommunityParams = {
  communityId: string;
  name: string;
  bio: string;
  profilePhoto: string;
  coverPhoto: string;
  path: string;
};

export type TGetCommunityContentsParams = {
  id: string;
  page?: number;
  pageSize?: number;
};

export interface IDeleteCommunityParams {
  communityId: string;
  path: string;
}
