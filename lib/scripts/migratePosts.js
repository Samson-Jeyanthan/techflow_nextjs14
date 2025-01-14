import mongoose from "mongoose";
import { connectToDatabase, disconnectFromDatabase } from "./mongoose.js";

const { model, models, Schema } = mongoose;

// ------------------------ post model ------------------------------

const PostSchema = new Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  media: [
    {
      mediaType: { type: String, default: "" },
      mediaURL: { type: String, default: "" },
      thumbnailURL: { type: String, default: "" },
    },
  ],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  views: { type: Number, default: 0 },
  groupId: { type: String, default: "" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  communityId: { type: String, default: "", ref: "Community" },
  createdAt: { type: Date, default: Date.now },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;

// ---------------------- migration function -----------------------

const migratePostImagesToMedia = async () => {
  try {
    // Connect to the database
    connectToDatabase();

    // Find all posts
    const posts = await Post.find({});

    // Update each post
    for (const post of posts) {
      console.log(post.postImage);
      post.groupId = undefined;
      post.communityId = "";

      // if (post.postImage && typeof post.postImage === "string") {
      // post.media = [
      //   {
      //     mediaType: "image", // Assuming existing postImage fields are images
      //     mediaURL: post.postImage,
      //     thumbnailURL: "",
      //   },
      // ];

      // Remove the postImage field
      // post.postImage = undefined;
      // } else {
      //   post.media = [];
      // }

      await post.save();
      // console.log(`Post with ID ${post._id} updated`);
    }

    console.log("Migration completed!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    disconnectFromDatabase();
  }
};

migratePostImagesToMedia();
