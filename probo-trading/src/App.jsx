import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

const App = () => {
  const [balance, setBalance] = useState(0); // Initial balance is 0

  return (
    <Router>
      <Header balance={balance} />  {/* Pass balance to Header */}
      <Routes>
        <Route path="/" element={<Dashboard balance={balance} setBalance={setBalance} />} />
        <Route path="/home" element={<Home balance={balance} setBalance={setBalance} />} />
      </Routes>
    </Router>
  );
};

export default App;
