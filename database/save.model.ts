import { Schema, models, model, Document } from "mongoose";

export interface ISave extends Document {
  userId: Schema.Types.ObjectId;
  savedItemId: Schema.Types.ObjectId;
  savedFor: "Question" | "Post" | "Job" | "Resource";
  savedAt: Date;
}

const SaveSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  savedItemId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "savedFor",
  },
  savedFor: {
    type: String,
    enum: ["Question", "Post", "Job", "Resource"],
    required: true,
  },
  savedAt: { type: Date, default: Date.now },
});

const Save = models.Save || model("Save", SaveSchema);

export default Save;
