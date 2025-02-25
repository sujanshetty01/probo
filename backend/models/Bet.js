const mongoose = require("mongoose");

const betSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model (if authentication is added)
    required: true,
  },
  market: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  odds: {
    type: Number,
    required: true,
  },
  outcome: {
    type: String,
    enum: ["win", "lose", "pending"], // Status of bet
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bet = mongoose.model("Bet", betSchema);
module.exports = Bet;
