import React from "react";

const ResultDisplay = ({ result }) => {
  return (
    <div>
      {result !== null && (
        <h2 style={{ color: result ? "green" : "red" }}>
          {result ? "🎉 You Win! 🎉" : "❌ You Lose! ❌"}
        </h2>
      )}
    </div>
  );
};

export default ResultDisplay;
