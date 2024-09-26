import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  location?: string;
  bio: string;
  avatar?: string;
  reputation?: number;
  socialLinks?: {
    name:
      | "FACEBOOK"
      | "TWITTER"
      | "INSTAGRAM"
      | "LINKEDIN"
      | "GITHUB"
      | "YOUTUBE"
      | "PORTFOLIO"
      | "OTHER";
    url: string;
  }[];
  saved?: Schema.Types.ObjectId[];
  followers?: {
    userId: Schema.Types.ObjectId;
    followedAt: Date;
  }[];
  followings?: Schema.Types.ObjectId[];
  // communities: Schema.Types.ObjectId[];
  // createdCommunities: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  location: { type: String },
  bio: { type: String },
  avatar: { type: String },
  reputation: { type: Number, default: 0 },
  socialLinks: [
    {
      name: {
        type: String,
        enum: [
          "FACEBOOK",
          "TWITTER",
          "INSTAGRAM",
          "LINKEDIN",
          "GITHUB",
          "YOUTUBE",
          "PORTFOLIO",
          "OTHER",
        ],
      },
      url: { type: String },
    },
  ],
  saved: [{ type: Schema.Types.ObjectId, ref: "Save" }],
  followers: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      followedAt: { type: Date, default: Date.now },
    },
  ],
  followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
  // communities: [{ type: Schema.Types.ObjectId, ref: "Community" }],
  // createdCommunities: [{ type: Schema.Types.ObjectId, ref: "Community" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;
