import { Schema, models, model, Document } from "mongoose";

export interface IApplication extends Document {
  jobId: Schema.Types.ObjectId;
  applicant: Schema.Types.ObjectId;
  resumeUrl: string;
  coverLetter?: string;
  status: string;
  appliedAt: Date;
}

const ApplicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
  resumeUrl: { type: String, required: true },
  coverLetter: { type: String },
  status: {
    type: String,
    enum: ["pending", "reviewed", "accepted", "rejected"],
    default: "pending",
  },
  appliedAt: { type: Date, default: Date.now },
});

const Application =
  models.Application || model("Application", ApplicationSchema);

export default Application;
