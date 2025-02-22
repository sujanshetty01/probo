import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import BetOption from "../components/BetOption";
import ResultDisplay from "../components/ResultDisplay";
import BetHistory from "../components/BetHistory";

const socket = io("http://localhost:5000"); // Connect to backend

const Home = ({ balance, setBalance }) => {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [selectedBet, setSelectedBet] = useState(null);
  const [result, setResult] = useState(null);
  const [betHistory, setBetHistory] = useState([]);
  const [odds, setOdds] = useState({ Yes: 1.8, No: 2.0 }); // Default odds

  // Fetch live odds from backend
  useEffect(() => {
    socket.on("updateOdds", (data) => {
      setOdds(data.odds);
    });

    return () => {
      socket.off("updateOdds"); // Cleanup on unmount
      socket.disconnect();
    };
  }, []);

  const handlePlaceBet = (option) => {
    const amount = parseInt(betAmount, 10);

    if (!submittedQuestion) {
      alert("Please enter a question first!");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid bet amount!");
      return;
    }
    if (amount > balance) {
      alert("Insufficient balance!");
      return;
    }

    setSelectedBet(option);

    // Simulate the result based on odds
    const randomValue = Math.random();
    const winProbability = option === "Yes" ? 1 / odds.Yes : 1 / odds.No;
    const isWinner = randomValue < winProbability;

    setResult(isWinner);
    setBalance(isWinner ? balance + amount * odds[option] : balance - amount);

    setBetHistory([
      ...betHistory,
      { question: submittedQuestion, option, amount, result: isWinner },
    ]);
  };

  const handleSubmitQuestion = () => {
    if (!question.trim()) {
      alert("Please enter a valid question!");
      return;
    }
    setSubmittedQuestion(question);
    setQuestion("");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={balanceStyle}>Balance: {balance} units</h2>

        {!submittedQuestion ? (
          <>
            <h2>Enter Your Question:</h2>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Will it rain tomorrow?"
              style={inputStyle}
            />
            <button onClick={handleSubmitQuestion} style={buttonStyle}>
              Submit Question
            </button>
          </>
        ) : (
          <>
            <h2 style={questionStyle}>Question: {submittedQuestion}</h2>
            <h3>Enter Your Bet Amount:</h3>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="Enter amount"
              style={inputStyle}
            />
            <h3>Current Odds:</h3>
            <p style={oddsStyle}>
              Yes: {odds.Yes.toFixed(2)} | No: {odds.No.toFixed(2)}
            </p>
            <h3>Select Your Bet:</h3>
            <div style={betButtonsContainer}>
              <BetOption option="Yes" onPlaceBet={handlePlaceBet} />
              <BetOption option="No" onPlaceBet={handlePlaceBet} />
            </div>
          </>
        )}

        {selectedBet && (
          <p style={betTextStyle}>
            You placed a bet on: <strong>{selectedBet}</strong> with{" "}
            <strong>{betAmount}</strong> units
          </p>
        )}
        <ResultDisplay result={result} />
      </div>

      <div style={historyContainerStyle}>
        <BetHistory history={betHistory} />
      </div>
    </div>
  );
};

// 🎨 Styled Components
const containerStyle = {
  textAlign: "center",
  marginTop: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontFamily: "'Arial', sans-serif",
  background: "linear-gradient(135deg, #F3F4F6, #E5E7EB)",
  minHeight: "100vh",
  padding: "20px",
};

const cardStyle = {
  width: "60%",
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  transition: "0.3s",
};

const balanceStyle = {
  fontSize: "1.5em",
  fontWeight: "bold",
  color: "#4CAF50",
};

const questionStyle = {
  fontSize: "1.3em",
  fontWeight: "bold",
  color: "#007bff",
};

const inputStyle = {
  padding: "12px",
  width: "80%",
  margin: "10px 0",
  border: "2px solid #007bff",
  borderRadius: "8px",
  fontSize: "1em",
  outline: "none",
  transition: "border-color 0.3s",
};

const buttonStyle = {
  padding: "12px 25px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "8px",
  fontSize: "1em",
  transition: "0.3s",
};

buttonStyle[":hover"] = {
  backgroundColor: "#45a049",
};

const betButtonsContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "10px",
};

const betTextStyle = {
  fontSize: "1.2em",
  fontWeight: "bold",
  color: "#333",
  marginTop: "10px",
};

const oddsStyle = {
  fontSize: "1.2em",
  fontWeight: "bold",
  color: "#ff5733",
  marginBottom: "10px",
};

const historyContainerStyle = {
  width: "60%",
  backgroundColor: "#f9f9f9",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  marginTop: "20px",
};

export default Home;
