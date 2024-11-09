import { Schema, models, model, Document } from "mongoose";

export interface IApplication extends Document {
  job: Schema.Types.ObjectId;
  applicant: Schema.Types.ObjectId;
  resumeUrl: string;
  coverLetter?: string;
  status: string;
  appliedAt: Date;
}

const ApplicationSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
  resumeUrl: { type: String, required: true },
  coverLetter: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
    default: "Pending",
  },
  appliedAt: { type: Date, default: Date.now },
});

const Application =
  models.Application || model("Application", ApplicationSchema);

export default Application;
