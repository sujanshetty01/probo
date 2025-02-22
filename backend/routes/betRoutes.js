const express = require("express");
const Bet = require("../models/Bet");
const User = require("../models/user");

const router = express.Router();

// Place Bet
router.post("/place", async (req, res) => {
  const { userId, question, amount, option } = req.body;

  const user = await User.findById(userId);
  if (user.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

  user.balance -= amount;
  await user.save();

  const newBet = new Bet({ userId, question, amount, option, result: "Pending" });
  await newBet.save();

  res.json({ message: "Bet placed!", newBet });
});

// Get User Bets
router.get("/:userId", async (req, res) => {
  const bets = await Bet.find({ userId: req.params.userId });
  res.json(bets);
});

module.exports = router;
