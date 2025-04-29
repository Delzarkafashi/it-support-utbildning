import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
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

    if (password.length < 6) {
      setMessage({ text: "Lösenord måste vara minst 6 tecken.", type: "error" });
      return;
    }

    setMessage({ text: "Inloggning lyckades! 🎉", type: "success" });
    setEmail("");
    setPassword("");
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
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
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
