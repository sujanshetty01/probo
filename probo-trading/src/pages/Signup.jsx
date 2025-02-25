import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      {/* Probo Branding */}
      <h1 style={styles.proboBadge}>Probo </h1>

      <div style={styles.signupBox}>
        <h2 style={styles.title}>Create Account</h2>

        {error && <p style={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            style={styles.inputField}
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={styles.inputField}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            style={styles.inputField}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" style={styles.signupButton}>Sign Up</button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <a href="/login" style={styles.loginLink}>Login</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #000000, #2c2c2c)",
    fontFamily: "Arial, sans-serif",
  },
  proboBadge: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: "2px",
    background: "linear-gradient(90deg, #ffffff, #bbbbbb)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "20px",
    textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
  },
  signupBox: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "30px",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.2)",
    width: "350px",
    textAlign: "center",
    color: "white",
  },
  title: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "bold",
  },
  inputField: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    border: "none",
    borderRadius: "8px",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    color: "white",
    fontSize: "16px",
    textAlign: "center",
  },
  signupButton: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    background: "linear-gradient(90deg, #ffffff, #b3b3b3)",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
  },
  errorMessage: {
    color: "#ff4b5c",
    background: "rgba(255, 75, 92, 0.2)",
    padding: "8px",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  loginText: {
    marginTop: "15px",
  },
  loginLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Signup;
