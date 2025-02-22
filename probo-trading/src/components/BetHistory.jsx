import React from "react";

const BetHistory = ({ history }) => {
  return (
    <div>
      <h2>Bet History</h2>
      <ul>
        {history.map((bet, index) => (
          <li key={index}>
            {bet.question} - Bet: {bet.option} ({bet.amount} units) - Result: {bet.result ? "Win ✅" : "Lose ❌"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BetHistory;
