import React from 'react';

const Header = ({ balance }) => {
  return (
    <header style={headerStyle}>
      <h1>Probo Trading Game</h1>
      <p>Balance: <span style={balanceStyle}>${balance}</span></p>
    </header>
  );
};

const headerStyle = {
  textAlign: 'center',
  backgroundColor: '#282c34',
  color: 'white',
  padding: '20px',
  fontSize: '1.2em',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const balanceStyle = {
  fontWeight: 'bold',
  color: '#4CAF50', // Green color for positive balance
};

export default Header;

