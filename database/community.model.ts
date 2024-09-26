import { Schema, models, model, Document } from "mongoose";

export interface ICommunity extends Document {
  name: string;
  description: string;
  members?: Schema.Types.ObjectId[];
  admins: Schema.Types.ObjectId[];
  questions?: Schema.Types.ObjectId[];
  posts?: Schema.Types.ObjectId[];
  resources?: Schema.Types.ObjectId[];
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
}

const CommunitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  resources: [{ type: Schema.Types.ObjectId, ref: "Resource" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Community = models.Community || model("Community", CommunitySchema);

export default Community;
