"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import { TCreateQuestionParams, TGetQuestionsParams } from "./shared.types";

export async function getQuestions(params: TGetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({}).populate({
      path: "tags",
      model: Tag,
    });
  } catch (error) {}
}

export async function createQuestion(params: TCreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, author, tags, path } = params;
    // create the question in db
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // create the tags in db or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, // try to find an existing tag
        {
          $setOnInsert: { name: tag }, // if no tag is found, it creates a new one
          $push: { questions: question._id }, // and adds the question id into the questions
        },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // create an interaction record for the user's ask-question action

    // increment author's reputation by +5 for ask-question
  } catch (error) {
    //
  }
}
