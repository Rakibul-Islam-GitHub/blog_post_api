const router = require("express").Router();
const User = require("../models/userModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register router
//api/user/register
router.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    //validation
    if (!email || !name || !password)
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
      name: req.body.name,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PW_SECRET
      ).toString(),
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json({name: savedUser.name, email: savedUser.email});
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    console.error(err);
    //internal server error
    res.status(500).send('Something went wrong!');
  }
});


//login router
// api/user/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong email or does not exist!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PW_SECRET
    );
    const originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalpassword !== req.body.password &&
      res.status(401).json("Oops.. Wrong password!");

    //jwt token
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

   
    res.status(200).json({name: user.name, email:user.email, isAdmin: user.isAdmin, token });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;