const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Đánh giá không thể để trống!"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: "Blog",
      required: [true, "Vui lòng cung cấp bài viết đánh giá."],
    },
    updateAt: Date,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Đánh giá phải từ một người dùng nào đó"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
CommentSchema.pre(/^find/, async function (next) {
    this.populate({
      path: "user",
      select: "name",
    });
    next();
  });
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;