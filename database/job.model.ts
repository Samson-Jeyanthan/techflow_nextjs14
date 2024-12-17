import { Schema, models, model, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  workMode: string;
  employmentType: string;
  furtherDetailLink?: string;
  salaryPer?: string;
  salaryCurrency?: string;
  salary?: string;
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
  workMode: {
    type: String,
    required: true,
    enum: ["remote", "onsite", "hybrid"],
  },
  employmentType: {
    type: String,
    required: true,
    enum: ["fullTime", "partTime", "contract", "internship", "freelance"],
  },
  furtherDetailLink: { type: String },
  salaryCurrency: { type: String },
  salary: { type: String },
  salaryPer: { type: String },
  location: { type: String, required: true },
  deadline: { type: Date, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  applications: [{ type: Schema.Types.ObjectId, ref: "Application" }],
  createdAt: { type: Date, default: Date.now },
});

const Job = models.Job || model("Job", JobSchema);

export default Job;
