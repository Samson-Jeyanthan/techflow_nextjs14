import mongoose from "mongoose";
import { connectToDatabase, disconnectFromDatabase } from "./mongoose.js";

const { model, models, Schema } = mongoose;

// ------------------------ question model ------------------------------

const QuestionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  views: { type: Number, default: 0 },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  communityId: { type: Schema.Types.ObjectId, ref: "Community" },
  createdAt: { type: Date, default: Date.now },
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;

// ------------------------ migration function ----------------------------

const migrateQuestions = async () => {
  try {
    connectToDatabase();

    const questions = await Question.find({});

    for (const question of questions) {
      question.communityId = null;

      await question.save();
    }

    console.log("Questions migrated successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    disconnectFromDatabase();
  }
};

migrateQuestions();
