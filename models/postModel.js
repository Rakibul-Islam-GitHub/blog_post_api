const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
    postby: {type: mongoose.Schema.Types.ObjectId, requred: true, ref: 'User'},
    title: { type: String,  },
    description: { type: String },
    image: { type: String },
    upvote: [{ type: String }],
    downvote: [{ type: String }],
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
