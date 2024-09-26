import { Schema } from "mongoose";
import { IUser } from "@/database/user.model";

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
