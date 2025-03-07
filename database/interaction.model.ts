import { Schema, model, models, Document } from "mongoose";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId;
  action: string;
  question: Schema.Types.ObjectId[];
  answer: Schema.Types.ObjectId[];
  tags: Schema.Types.ObjectId[];
  post: Schema.Types.ObjectId[];
  resource: Schema.Types.ObjectId[];
  job: Schema.Types.ObjectId[];
  createdAt: Date;
}

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  resource: { type: Schema.Types.ObjectId, ref: "Resource" },
  job: { type: Schema.Types.ObjectId, ref: "Job" },
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
