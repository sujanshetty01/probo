import React from 'react';
const BetOption = ({ option, onPlaceBet }) => {
  return (
    <button style={buttonStyle} onClick={() => onPlaceBet(option)}>
      {option}
    </button>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export default BetOption;
