import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!email || !password) {
      setMessage({ text: "Alla fält måste fyllas i.", type: "error" });
      return;
    }

    if (!validateEmail(email)) {
      setMessage({ text: "Ogiltig e-postadress.", type: "error" });
      return;
    }

    try {
      const response = await fetch("https://localhost:7266/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fel e-post eller lösenord.");
      }

      const { token } = data;

      const userRes = await fetch("https://localhost:7266/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userInfo = await userRes.json();

      login({ token, email: userInfo.email, role: userInfo.role });

      setMessage({ text: "Inloggning lyckades!", type: "success" });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setMessage({
        text: error.message || "Nätverksfel eller serverproblem.",
        type: "error",
      });
    }
  };

  return (
    <div className="login-container">
      <h1>Logga in</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <span className="input-icon">✉️</span>
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <Link to="/forgot-password" className="forgot-password">
          Glömt lösenord?
        </Link>
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
};

export default Login;
