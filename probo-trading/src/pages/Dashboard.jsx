import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ balance, setBalance }) => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  // Ensure balance is always defined
  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    if (storedBalance !== null) {
      setBalance(parseInt(storedBalance, 10) || 0);
    } else {
      setBalance(0); // Set default balance to 0 if not in localStorage
    }
  }, [setBalance]);

  const handleTransaction = (type) => {
    const amountValue = parseInt(amount, 10);

    if (isNaN(amountValue) || amountValue <= 0) {
      alert("Enter a valid amount!");
      return;
    }

    let newBalance = balance || 0; // Ensure balance is never undefined

    if (type === "deposit") {
      newBalance += amountValue;
    } else if (type === "withdraw") {
      if (amountValue > newBalance) {
        alert("Insufficient balance!");
        return;
      }
      newBalance -= amountValue;
    }

    setBalance(newBalance);
    localStorage.setItem("balance", newBalance.toString());
    setAmount("");

    alert(`${type === "deposit" ? "Deposited" : "Withdrew"} ${amountValue} units!`);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Dashboard</h1>
        <p>
          Current Balance: <span>${(balance || 0).toLocaleString()}</span>
        </p>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="input"
        />

        <button onClick={() => handleTransaction("deposit")} className="button deposit-button">
          Deposit
        </button>
        <button onClick={() => handleTransaction("withdraw")} className="button withdraw-button">
          Withdraw
        </button>

        <button onClick={() => navigate("/home")} className="button trade-button">
          Start Trading
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
