const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {
  verifyToken,
} = require("./verifyToken");
const Post = require("../models/postModel");
// const {  cloudinary } = require("../utils/cloudinary");
const fileUpload = require("../utils/fileUpload");
const { cloudinary } = require("../utils/cloudinaryConfig");


// add post
router.post("/add",verifyToken,  async (req, res) => {

  

    if (!req.body.description || !req.file) {
        return res.json({message: 'Data field missing!'})
    }


    if (req.file) {
        try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
           
    // Create new post
     const newPost = new Post({
        description: req.body.description,
         postby: req.user._id,
        image: result.secure_url,
  });
    res.status(200)
      .send({
        newPost
      });
  } catch (err) {
    console.log(err);
  }
    } else {
         const newPost = new Post({
        description: req.body.description,
             postby: req.user._id,
        image: 'https://via.placeholder.com/400x300'
  });
      try {
        const savedPost =  newPost.save();
    
      res.json(savedPost);

      } catch (error) {
        res.status(500).json(error);
      }
    }
    
    
     
      
  
});


module.exports = router;