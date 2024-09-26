import { Schema, models, model, Document } from "mongoose";

export interface ISave extends Document {
  userId: string;
  savedItemId: string;
  saveFor: "QUESTION" | "POST" | "JOB" | "RESOURCE";
}

const SaveSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  savedItemId: { type: Schema.Types.ObjectId, required: true },
  saveFor: {
    type: String,
    enum: ["QUESTION", "POST", "JOB", "RESOURCE"],
    required: true,
  },
});

const Save = models.Save || model("Save", SaveSchema);

export default Save;
