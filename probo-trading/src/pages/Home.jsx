import React, { useState } from "react";
import BetOption from "../components/BetOption";
import ResultDisplay from "../components/ResultDisplay";
import BetHistory from "../components/BetHistory";
import "./Home.css"; // Import CSS file for styling

const Home = ({ balance, setBalance }) => {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [selectedBet, setSelectedBet] = useState(null);
  const [result, setResult] = useState(null);
  const [betHistory, setBetHistory] = useState([]);
  const [yesBets, setYesBets] = useState(0);
  const [noBets, setNoBets] = useState(0);

  const handlePlaceBet = (option) => {
    const amount = parseInt(betAmount, 10);

    if (!submittedQuestion) return alert("Please enter a question first!");
    if (isNaN(amount) || amount <= 0) return alert("Please enter a valid bet amount!");
    if (amount > balance) return alert("Insufficient balance!");

    option === "Yes" ? setYesBets((prev) => prev + amount) : setNoBets((prev) => prev + amount);

    setSelectedBet(option);
    const outcome = Math.random() > 0.5 ? "Yes" : "No";
    const isWinner = option === outcome;

    setResult(isWinner);
    setBalance(isWinner ? balance + amount : balance - amount);

    setBetHistory([...betHistory, { question: submittedQuestion, option, amount, result: isWinner }]);
  };

  const handleSubmitQuestion = () => {
    if (!question.trim()) return alert("Please enter a valid question!");
    setSubmittedQuestion(question);
    setQuestion("");
    setYesBets(0);
    setNoBets(0);
  };

  const totalBets = yesBets + noBets;
  const yesOdds = totalBets === 0 ? 50 : Math.round((yesBets / totalBets) * 100);
  const noOdds = totalBets === 0 ? 50 : Math.round((noBets / totalBets) * 100);

  return (
    <div className="home-container">
      <h2 className="balance">Balance: {balance} units</h2>
      {!submittedQuestion ? (
        <div className="question-section">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter a question"
            className="question-input"
          />
          <button onClick={handleSubmitQuestion} className="submit-button">
            Submit
          </button>
        </div>
      ) : (
        <div className="betting-section">
          <h2 className="question-text">Question: {submittedQuestion}</h2>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            placeholder="Enter bet amount"
            className="amount-input"
          />
          <p className="odds-text">Live Betting Odds: <b>Yes</b>: {yesOdds}% | <b>No</b>: {noOdds}%</p>
          <div className="bet-buttons">
            <BetOption option="Yes" odds={yesOdds} onPlaceBet={handlePlaceBet} />
            <BetOption option="No" odds={noOdds} onPlaceBet={handlePlaceBet} />
          </div>
        </div>
      )}
      {selectedBet && <p className="bet-info">You placed a bet on: {selectedBet} with {betAmount} units</p>}
      <ResultDisplay result={result} />
      <BetHistory history={betHistory} />
    </div>
  );
};

export default Home;
