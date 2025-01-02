import { Schema, models, model, Document } from "mongoose";

export interface IApplication extends Document {
  jobId: Schema.Types.ObjectId;
  applicant: Schema.Types.ObjectId;
  applicantName: string;
  applicantEmail: string;
  resume: {
    url: string;
    name: string;
  };
  coverLetter?: string;
  status: string;
  appliedOn: Date;
}

const ApplicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  resume: {
    url: { type: String, required: true },
    name: { type: String, required: true },
  },
  coverLetter: { type: String },
  status: {
    type: String,
    enum: ["pending", "reviewed", "accepted", "rejected"],
    default: "pending",
  },
  appliedOn: { type: Date, default: Date.now },
});

const Application =
  models.Application || model("Application", ApplicationSchema);

export default Application;
