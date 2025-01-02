import { Schema, models, model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  media: [
    {
      mediaType: string;
      mediaURL: string;
      thumbnailURL: string;
    },
  ];
  tags: Schema.Types.ObjectId[];
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
  views: number;
  groupId: string;
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

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
  createdAt: { type: Date, default: Date.now },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
