import React, { useState } from "react";
import BetOption from "../components/BetOption";
import ResultDisplay from "../components/ResultDisplay";
import BetHistory from "../components/BetHistory";

const Home = ({ balance, setBalance }) => {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [selectedBet, setSelectedBet] = useState(null);
  const [result, setResult] = useState(null);
  const [betHistory, setBetHistory] = useState([]);

  const handlePlaceBet = (option) => {
    const amount = parseInt(betAmount, 10);
    if (!submittedQuestion || isNaN(amount) || amount <= 0 || amount > balance) {
      alert("Invalid bet!");
      return;
    }

    setSelectedBet(option);
    const outcome = Math.random() > 0.5 ? "Yes" : "No";
    const isWinner = option === outcome;

    const newBalance = isWinner ? balance + amount : balance - amount;
    setBalance(newBalance);
    localStorage.setItem("balance", newBalance);

    setResult(isWinner);
    setBetHistory([...betHistory, { question: submittedQuestion, option, amount, result: isWinner }]);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Balance: {balance} units</h2>

        {!submittedQuestion ? (
          <>
            <h2>Enter Your Question:</h2>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Will it rain tomorrow?"
              className="input"
            />
            <button onClick={() => setSubmittedQuestion(question)} className="button deposit-button">
              Submit Question
            </button>
          </>
        ) : (
          <>
            <h2>Question: {submittedQuestion}</h2>
            <h3>Enter Your Bet Amount:</h3>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="Enter amount"
              className="input"
            />
            <h3>Select Your Bet:</h3>
            <div>
              <BetOption option="Yes" onPlaceBet={handlePlaceBet} />
              <BetOption option="No" onPlaceBet={handlePlaceBet} />
            </div>
          </>
        )}

        {selectedBet && <p>You bet on: {selectedBet} with {betAmount} units</p>}
        <ResultDisplay result={result} />
      </div>

      <BetHistory history={betHistory} />
    </div>
  );
};

export default Home;
