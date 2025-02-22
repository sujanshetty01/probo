const mongoose = require("mongoose");

const BetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: String,
  amount: Number,
  option: String,
  result: String, // "Win" | "Loss"
});

module.exports = mongoose.model("Bet", BetSchema);
