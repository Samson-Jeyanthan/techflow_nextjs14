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
