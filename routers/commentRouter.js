const router = require("express").Router();
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const { verifyToken } = require("./verifyToken");

// add comment
router.post("/add",verifyToken,  async (req, res) => {

   try {
    
     const commentdone = new Comment({
        postid: req.body.postid,
        commentby: req.user._id,
        username: req.user.name,
        comment: req.body.comment,
     });
    const savedComment = await commentdone.save();
    res.status(200)
      .send(
        savedComment
      );
  } catch (err) {
    console.log(err);
  }
  
});


//get comment by postid
router.get("/:id", async (req, res) => {
  
  try {
      const cmt = await Comment.find({ postid: req.params.id })
      
      res.status(200).json(cmt)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
