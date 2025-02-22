const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  res.json({ message: "User registered successfully!" });
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user });
});

module.exports = router;
