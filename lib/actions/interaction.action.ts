"use server";

import { connectToDatabase } from "../mongoose";
import { IViewQuestionParams } from "./shared.types";
import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";
import User from "@/database/user.model";

export async function viewQuestion(params: IViewQuestionParams) {
  try {
    connectToDatabase();

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
        action: "view_question",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopInteractedTagsAction(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    // find user
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("user not found");
    }

    // Find interactions for the user and group by tags...
    // Interaction...

    // Find the user's interactions
    const userInteractions = await Interaction.find({ user: user._id })
      .populate("tags")
      .exec();

    // Extract tags from user's interactions
    const userTags = userInteractions.reduce((tags, interaction) => {
      if (interaction.tags) {
        tags = tags.concat(interaction.tags);
      }
      return tags;
    }, []);

    // Get distinct tag IDs from user's interactions
    const distinctUserTagIds = [
      // @ts-ignore
      ...new Set(userTags.map((tag: any) => tag._id)),
    ];

    console.log(distinctUserTagIds);

    return [
      { _id: "1", name: "tag" },
      { _id: "2", name: "tag2" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
