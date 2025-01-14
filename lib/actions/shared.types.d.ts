import { Schema } from "mongoose";
import { IUser } from "@/database/user.model";
import { IMediaProps } from "@/types/utils.types";

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
};

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

export interface IGetQuestionByIdParams {
  questionId: string;
}

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

export interface IQuestionVoteParams {
  questionId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}

export interface IAnswerVoteParams {
  answerId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}

export interface IToggleSaveParams {
  userId: string;
  saveFor: "QUESTION" | "POST" | "JOB" | "RESOURCE";
  savedItemId: string;
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

export interface IGetUserByIdParams {
  userId: string;
}

export interface IGetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
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

export interface IDeleteAnswerParams {
  answerId: string;
  path: string;
}

export type TCreatePostParams = {
  title?: string;
  description?: string;
  media?: IMediaProps[];
  tags?: string[];
  author: Schema.Types.ObjectId | IUser;
  groupId?: string;
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

export type TCreateJobParams = {
  title: string;
  description: string;
  workMode: string;
  employmentType: string;
  furtherDetailLink: string | undefined;
  salaryPer: string | undefined;
  salaryCurrency: string | undefined;
  salary: number | undefined;
  location: string;
  deadline: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
};
