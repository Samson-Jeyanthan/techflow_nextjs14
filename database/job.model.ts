import { Schema, models, model, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  workmode: string;
  employmentType: string;
  furtherDetailLink?: string;
  salaryPer?: string;
  salaryCurrency?: string;
  salary?: number;
  location: string;
  deadline: Date;
  tags: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  applications: Schema.Types.ObjectId[];
  createdAt: Date;
}

const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  workmode: {
    type: String,
    required: true,
    enum: ["Remote", "On-site", "Hybrid"],
  },
  employmentType: {
    type: String,
    required: true,
    enum: ["Full-time", "Part-time", "Contract"],
  },
  furtherDetailLink: { type: String },
  salaryCurrency: { type: String },
  salary: { type: Number },
  salaryPer: { type: String, enum: ["Hour", "Day", "Month", "Year"] },
  location: { type: String, required: true },
  deadline: { type: Date, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  applications: [{ type: Schema.Types.ObjectId, ref: "Application" }],
  createdAt: { type: Date, default: Date.now },
});

const Job = models.Job || model("Job", JobSchema);

export default Job;
