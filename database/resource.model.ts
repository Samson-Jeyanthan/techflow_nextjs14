import { Schema, model, models, Document } from "mongoose";

export interface IResource extends Document {
  title: string;
  description: string;
  media?: string;
  websiteLink?: string;
  tags: Schema.Types.ObjectId[];
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  communityId?: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

const ResourceSchema = new Schema({
  title: { type: String },
  description: { type: String },
  media: { type: String, default: "" },
  websiteLink: { type: String, default: "" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  communityId: { type: Schema.Types.ObjectId, ref: "Community" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Resource = models?.Resource || model("Resource", ResourceSchema);

export default Resource;
