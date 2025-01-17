import mongoose from "mongoose";
import { connectToDatabase, disconnectFromDatabase } from "./mongoose.js";

const { model, models, Schema } = mongoose;

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
  followings: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      followedAt: { type: Date, default: Date.now },
    },
  ],
  cvResume: {
    url: { type: String, default: "" },
    name: { type: String, default: "" },
  },
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;

// ------------------------ migration function ----------------------------

const migrateSaveToSaveCollection = async () => {
  try {
    connectToDatabase();
    const users = await User.find({});
    for (const user of users) {
      user.set("savedCollection", undefined, { strict: false });

      user.saved = [];
      await user.save();
    }
  } catch (error) {
    console.log(error);
  } finally {
    disconnectFromDatabase();
  }
};

migrateSaveToSaveCollection();
