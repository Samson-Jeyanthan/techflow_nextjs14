import { Schema, models, model, Document } from "mongoose";

export interface IComment extends Document {
  postId: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  content: string;
  parentCommentId?: Schema.Types.ObjectId;
  createdAt: Date;
}

const CommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  parentCommentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
