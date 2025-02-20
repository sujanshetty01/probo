import React from 'react';
const BetHistory = ({ history }) => {
  return (
    <div style={historyStyle}>
      <h3>Bet History</h3>
      <ul>
        {history.map((bet, index) => (
          <li key={index}>
            Bet: {bet.option} - Result: {bet.result ? 'Win' : 'Loss'}
          </li>
        ))}
      </ul>
    </div>
  );
};

const historyStyle = {
  marginTop: '30px',
  textAlign: 'center',
};

export default BetHistory;
