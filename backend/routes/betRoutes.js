const express = require("express");
const Bet = require("../models/Bet");

const router = express.Router();

// ✅ Place a new bet
router.post("/place", async (req, res) => {
  try {
    const { user, market, amount, odds } = req.body;

    if (!user || !market || !amount || !odds) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBet = new Bet({
      user,
      market,
      amount,
      odds,
    });

    await newBet.save();
    res.status(201).json({ message: "Bet placed successfully", bet: newBet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get all bets
router.get("/", async (req, res) => {
  try {
    const bets = await Bet.find().populate("user", "username");
    res.json(bets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
