const express = require("express");
const User = require("../models/user");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route GET /api/admin/users
// @desc get all users (Admin Only)
// @access Private/Admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/admin/users
// @desc Add a new user (admin only)
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ messaga: "User Already Exits" });
    }

    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });

    await user.save();
    res.status(201).json({ message: "User Created Successfully", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route PUT /api/admin/users/:id
//@desc Update user info (admin only) - Name , email and role
//@acees Private/Admin

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }
    const updatedUser = await user.save();
    res.json({ message: " User Updated Successfully ", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json("server error ");
  }
});

//@ route DELETE /api/admin/users/:id
//@ route delete a user
//@ access Private/Admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ messgae: "User is Deleted Succesfully" });
    } else {
      res.status(404).json({ messgae: "User Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});
module.exports = router;
