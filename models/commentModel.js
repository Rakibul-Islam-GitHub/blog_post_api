const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
    commentby: {type: mongoose.Schema.Types.ObjectId, requred: true, ref: 'User'},
    postid: {type: mongoose.Schema.Types.ObjectId, requred: true, ref: 'Post'},
    
    comment: { type: String },
    
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
