import React from "react";

const BetOption = ({ option, odds, onPlaceBet }) => {
  return (
    <button onClick={() => onPlaceBet(option)}>
      {option} ({odds}%)
    </button>
  );
};

export default BetOption;
