import { Schema, models, model, Document } from "mongoose";

export interface ICommunity extends Document {
  name: string;
  profilePhoto?: string;
  coverPhoto?: string;
  bio: string;
  members?: Schema.Types.ObjectId[];
  admins: Schema.Types.ObjectId[];
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
}

const CommunitySchema = new Schema({
  name: { type: String, required: true },
  profilePhoto: { type: String },
  coverPhoto: { type: String },
  bio: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Community = models.Community || model("Community", CommunitySchema);

export default Community;
