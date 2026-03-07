const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const  { protect } = require("../middleware/authMiddleware")
const router = express.Router();

// @router POST /api/users/register
// @desc Register a new user
// @access Public

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //Registration Logic
    // res.send({name , email , password});
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User Alredy Exist" });

    user = new User({ name, email, password });
    await user.save();

    // res.status(201).json({
    //     user:{
    //         _id:user.name,
    //         name:user.name,
    //         email:user.email,
    //         role:user.role,
    //     }
    // })

    //Create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    //Sign and Return the Token Along with the user Data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "100h" },
      (err, token) => {
        if (err) throw err;

        // send the user the token in response
        res.status(201).json({
          user: {
            _id: user.name,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/users/login
// @desc Authenticate user
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //find the user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    //Create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    //Sign and Return the Token Along with the user Data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "100h" },
      (err, token) => {
        if (err) throw err;

        // send the user the token in response
        res.json({
          user: {
            _id: user.name,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/users/profile
// @desc Get ligged-in User's Profile (Protectd Route)
// @access private

router.get("/profile", protect , async (req ,res) =>{
    res.json(req.user)
})

module.exports = router;
