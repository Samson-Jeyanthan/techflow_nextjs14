"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { IViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: IViewQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (!existingInteraction) {
        return console.log("User has already viewed the question");
      } else {
        await Question.findByIdAndUpdate(questionId, {
          $inc: { views: 1 },
        });
        console.log("User is viewing the question");
      }

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
