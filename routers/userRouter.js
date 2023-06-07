const router = require("express").Router();
const User = require("../models/userModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register router
//api/user/register
router.post("/register", async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
console.log(req.body);
    //validation
    if (!email || !firstname || !lastname || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "This email already exists.",
      });

   

    const newUser = new User({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PW_SECRET
      ).toString(),
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json({firstname: savedUser.firstname, lastname: savedUser.lastname, email: savedUser.email});
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    console.error(err);
    //internal server error
    res.status(500).send('Something went wrong!');
  }
});


module.exports = router;