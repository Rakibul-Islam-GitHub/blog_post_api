const router = require("express").Router();
const Comment = require("../models/commentModel");
const { verifyToken } = require("./verifyToken");

// add comment
router.post("/add",verifyToken,  async (req, res) => {

   try {
    
     const commentdone = new Comment({
        postid: req.body.postid,
        commentby: req.user._id,
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


module.exports = router;
